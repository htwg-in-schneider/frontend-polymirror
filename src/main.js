import './assets/css/styles.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { createAuth0 } from '@auth0/auth0-vue'

const pinia = createPinia()

createApp(App)
    .use(router)
    .use(pinia)
    .use(createAuth0({
        domain: import.meta.env.VITE_AUTH0_DOMAIN,
        clientId: import.meta.env.VITE_AUTH0_CLIENT_ID,
        cacheLocation: 'localstorage',
        useRefreshTokens: true,
        authorizationParams: {
            redirect_uri: window.location.origin + import.meta.env.BASE_URL,
            audience: import.meta.env.VITE_AUTH0_AUDIENCE,
        },
    }))
    .mount('#app')
