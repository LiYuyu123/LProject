import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import EventBus from './bus/eventBus'
import './assets/less/normalize.less'

const $bus = new EventBus()


createApp(App).use(store).use(router).mount('#app')
