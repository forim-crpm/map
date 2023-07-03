import { defineStore } from 'pinia'
import type OSCType from '@/model/interfaces/OSCType'

export const useFilterStore = defineStore('filter', {
  state: () => ({
    oscTypes: [
      {
        label: "Agence / Organisme public",
        value: "Agence / Organisme public",
        color: "#FFD180",
        isActive: false,
      },
      {
        label: "Association",
        value: "Association",
        color: "#FF9E80",
        isActive: false,
      },
      {
        label: "Collectivité territoriale",
        value: "Collectivité territoriale",
        color: "#FFE57F",
        isActive: false,
      },
      {
        label: "Culturel",
        value: "Culturel",
        color: "#FFFF8D",
        isActive: false,
      },
      {
        label: "Entreprise / Syndicat",
        value: "Entreprise / Syndicat",
        color: "#DCE775",
        isActive: false,
      },
      {
        label: "ONG internationale",
        value: "ONG internationale",
        color: "#B9F6CA",
        isActive: false,
      },
      {
        label: "OSIM (diaspora)",
        value: "OSIM (diaspora)",
        color: "#C5E1A5",
        isActive: false,
      },
      {
        label: "Recherche / Apprentissage",
        value: "Recherche / Apprentissage",
        color: "#E0F2F1",
        isActive: false,
      }
    ] as OSCType[],
  }),

  getters: {
    isAllOSCTypeFiltersInactive: (state): boolean => {
      return state.oscTypes.filter(oscType => oscType.isActive).length === 0
    },
  },

  actions: {
  }
})
