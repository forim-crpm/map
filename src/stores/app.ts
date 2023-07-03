import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    isOtherFiltersShown: false,
    isInfoPanelShown: true,
  }),

  getters: {
  },

  actions: {
  }
})
