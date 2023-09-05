import { sentryVitePlugin } from "@sentry/vite-plugin";
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [vue(), vuetify({ autoImport: true }), sentryVitePlugin({
    org: "cartong-7594645d5",
    project: "grdr-crpm-javascript-vue"
  })],
  css: {
    preprocessorOptions: {
      less: {
          additionalData: '@import "./src/assets/less/_var.less";',
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})