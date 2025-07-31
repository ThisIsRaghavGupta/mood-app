import { createApp } from 'vue'
import './style.css'
import Particles from '@tsparticles/vue3' 
import App from './App.vue'
import { loadFull } from "tsparticles";


const app = createApp(App)

app.use(Particles, {
  init: async engine => {
    await loadFull(engine); // you can load the full tsParticles library from "tsparticles" if you need it
  },
}) // ✅ register the plugin
app.mount('#app')
