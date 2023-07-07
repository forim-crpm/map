import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    isAboutModalShown: false,
    isInfoPanelShown: false,
    isFiltersBarShown: false,
  }),

  getters: {
  },

  actions: {
  }
})
