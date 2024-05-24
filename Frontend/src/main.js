import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Antd from "ant-design-vue"
import VueGoogleMaps from '@fawmi/vue-google-maps';

// import "ant-design-vue/dist/antd.css"
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(VueGoogleMaps, {
    load: {
        key: 'AIzaSyDBBipgwyczwFN2wAv5Q04WMifIwL80DYw',
        // language: 'de',
    },
});
app.use(createPinia())
app.use(Antd)
app.use(router)
app.mount('#app')


