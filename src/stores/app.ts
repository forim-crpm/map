import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    isAboutModalShown: true,
    isInfoPanelShown: true,
    isOtherFiltersShown: false,
  }),

  getters: {
  },

  actions: {
  }
})
