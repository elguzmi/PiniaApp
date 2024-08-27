import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

// colocar pinia en nuestra app
const pinia = createPinia()

const app = createApp(App)

// agregamos pinia a nuestra aplicacion
// Es mucho mas sencillo que vuex 
app.use(pinia);
app.use(router)

app.mount('#app')
