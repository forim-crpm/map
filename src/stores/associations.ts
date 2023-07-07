import { defineStore } from 'pinia'
import type Association from '@/model/interfaces/Association'
import { useFilterStore } from './filters';

export const useAssociationStore = defineStore('associations', {
  state: () => ({
    associations: [] as Association[],
    activeAssociationId: null as null|Association['id']
  }),

  getters: {
    filteredAssociations: (state): Association[] => {
      let associations = state.associations

      // Filter by countries
      if (useFilterStore().countriesFilter.length) {
        associations = associations.filter((a: Association) => useFilterStore().countriesFilter.includes(a.country))
      }

      // Filter by thematics
      if (useFilterStore().thematicsFilter.length) {
        associations = associations.filter((a: Association) => useFilterStore().thematicsFilter.includes(a.thematics))
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

      // Filter by map extent
      if (useFilterStore().isMapSynced) {
        associations = associations.filter((association: Association) => {
          return useFilterStore().mapShownAssociations.includes(association.id)
        })
      }

      return associations.sort((a, b) => a.name.localeCompare(b.name));
    },
    activeAssociation: (state): Association|null => {
      return state.associations.find(association => association.id === state.activeAssociationId) ?? null
    },
  },

  actions: {
  }
})
