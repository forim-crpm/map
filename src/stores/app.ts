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
        name: "Synthèse nationale - Cameroun",
        filename: "Synthèse nationale - Cameroun.pdf"
      },
      {
        name: "Synthèse nationale - Côte d'Ivoire",
        filename: "Synthèse nationale - Côte d'Ivoire.pdf"
      },
      {
        name: "Synthèse nationale - Guinée",
        filename: "Synthèse nationale - Guinée.pdf"
      },
      {
        name: "Synthèse nationale - Mali",
        filename: "Synthèse nationale - Mali.pdf"
      },
      {
        name: "Synthèse nationale - Maroc",
        filename: "Synthèse nationale - Maroc.pdf"
      },
      {
        name: "Synthèse nationale - Sénégal",
        filename: "Synthèse nationale - Sénégal.pdf"
      },
      {
        name: "Synthèse nationale - Tunisie",
        filename: "Synthèse nationale - Tunisie.pdf"
      },
      {
        name: "Résultats synthétiques Tunisie",
        filename: "Résultats synthétiques_Tunisie.pdf"
      }, 
    ] as DownloadReport[]
  }),

  getters: {
  },

  actions: {
  }
})
