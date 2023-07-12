import { defineStore } from 'pinia'
import type Association from '@/model/interfaces/Association'
import { useFilterStore } from './filters';
import type Thematic from '@/model/interfaces/Thematic';

export const useAssociationStore = defineStore('associations', {
  state: () => ({
    associations: [] as Association[],
    activeAssociationId: null as null|Association['id'],
    hoveredAssociationId: null as null|Association['id']
  }),

  getters: {
    filteredAssociationsWithoutMapFilter: (state): Association[] => {
      
      let associations = state.associations

      // Filter by countries
      if (useFilterStore().countriesFilter.length) {
        associations = associations.filter((a: Association) => useFilterStore().countriesFilter.includes(a.country))
      }

      // Filter by thematics
      if (useFilterStore().thematicsFilter.length) {
        associations = associations.filter((a: Association) => a.thematics.some(
          (thematic: Thematic['value']) => useFilterStore().thematicsFilter.includes(thematic)
        ))
      }

      // Filter by search
      if (useFilterStore().search !== '') {
        let results: Association[] = []
        associations.forEach((association) => {
          let itemNormalized = association.name
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase();
          let searchNormalized = useFilterStore().search
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");
          if (itemNormalized.includes(searchNormalized)) {
            results.push(association);
          }
        })
        associations = results
      }
      return associations;
    },

    filteredAssociations(): Association[] {
      let associations = this.filteredAssociationsWithoutMapFilter

      // Filter by map extent
      if (useFilterStore().isMapSynced) {
        associations = associations.filter((association: Association) => {
          return useFilterStore().mapShownAssociations.includes(association.id)
        })
      }

      return associations.sort((a: Association, b: Association) => a.name.localeCompare(b.name));
    },
    activeAssociation: (state): Association|null => {
      return state.associations.find(association => association.id === state.activeAssociationId) ?? null
    },
  },

  actions: {
  }
})
