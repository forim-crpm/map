import { createApp } from 'vue'
import { createPinia } from 'pinia'
import createVuetify from '@/plugins/vuetify'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createVuetify)
app.use(createPinia())
app.use(router)

app.mount('#app')
