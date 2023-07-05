import { defineStore } from 'pinia'
import type Association from '@/model/interfaces/Association'

export const useAssociationStore = defineStore('associations', {
  state: () => ({
    associations: [] as Association[],
    activeAssociationId: null as null|Association['id']
  }),

  getters: {
    activeAssociation: (state): Association|null => {
      return state.associations.find(association => association.id === state.activeAssociationId) ?? null
    },
  },

  actions: {
  }
})
