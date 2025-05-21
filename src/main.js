import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '@fortawesome/fontawesome-svg-core/styles.css'

import App from './App.vue'
import router from './router'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faAddressBook,
  faArrowLeft,
  faArrowRight,
  faPhone,
  faGlobe,
  faLocationDot,
  faMapPin,
  faRotateRight,
  faSearch,
  faCircleExclamation,
  faQuoteLeft,
} from '@fortawesome/free-solid-svg-icons'
import { faEnvelope, faFaceFrown } from '@fortawesome/free-regular-svg-icons'

library.add(
  faAddressBook,
  faArrowLeft,
  faArrowRight,
  faPhone,
  faGlobe,
  faLocationDot,
  faMapPin,
  faRotateRight,
  faSearch,
  faCircleExclamation,
  faQuoteLeft,
  faEnvelope,
  faFaceFrown
)

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)

app.use(createPinia())
app.use(router)

app.mount('#app')
