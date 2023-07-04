import { defineStore } from 'pinia'
import type OSCType from '@/model/interfaces/OSCType'

export const useFilterStore = defineStore('filter', {
  state: () => ({
    oscTypes: [
      {
        label: "Agence / Organisme public",
        value: "agence_org_pub",
        color: "#FFD180",
        isActive: false,
      },
      {
        label: "Association",
        value: "association",
        color: "#FF9E80",
        isActive: false,
      },
      {
        label: "Collectivité territoriale",
        value: "col_ter",
        color: "#FFE57F",
        isActive: false,
      },
      {
        label: "Culturel",
        value: "culturel",
        color: "#FFFF8D",
        isActive: false,
      },
      {
        label: "Entreprise / Syndicat",
        value: "entreprise_syndicat",
        color: "#DCE775",
        isActive: false,
      },
      {
        label: "ONG internationale",
        value: "ong_int",
        color: "#B9F6CA",
        isActive: false,
      },
      {
        label: "OSIM (diaspora)",
        value: "osim",
        color: "#C5E1A5",
        isActive: false,
      },
      {
        label: "Recherche / Apprentissage",
        value: "recherche_app",
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
