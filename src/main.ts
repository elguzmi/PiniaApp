import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { VueQueryPlugin } from '@tanstack/vue-query'

// colocar pinia en nuestra app
const pinia = createPinia()

const app = createApp(App)
// agregamos pinia a nuestra aplicacion
// Es mucho mas sencillo que vuex 
app.use(pinia);
app.use(router)
VueQueryPlugin.install(app ,{
    queryClientConfig: {
        defaultOptions: {
            queries: {
                gcTime: 1000 * 120, //cachetime : si se solicitda la peticion cada 2 min va a mantenerse igual la info
                refetchOnReconnect: 'always' // cada vez que la app pierda conexion y se reconecta va a validar esos queries
            } 
        }
    }
})

app.mount('#app')
