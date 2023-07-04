import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    isAboutModalShown: false,
    isInfoPanelShown: true,
    isOtherFiltersShown: false,
  }),

  getters: {
  },

  actions: {
  }
})
