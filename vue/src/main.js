import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/less/normalize.less'

const $bus = new EventBus()
Vue.prototype.$bus = $bus

createApp(App).use(store).use(router).mount('#app')
