import type DownloadReport from '@/model/interfaces/DownloadReport'
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    isAboutModalShown: false,
    isRedirectionModalShown: false,
    isInfoPanelShown: false,
    isFiltersBarShown: false,
    isDownloadShown: false,
    triggerZoomReset: false,
    downloadReports: [
      {
        name: "Résultats synthétiques Tunisie",
        filename: "Résultats synthétiques_Tunisie.pdf"
      },
      {
        name: "Synthèse Nationale Côte d'Ivoire",
        filename: "Synthèse Nationale _Côte d'Ivoire.pdf"
      },
      {
        name: "Synthèse Nationale Sénégal",
        filename: "Synthèse Nationale_Sénégal.pdf"
      },
    ] as DownloadReport[]
  }),

  getters: {
  },

  actions: {
  }
})
