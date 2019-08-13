import Vue from 'vue'
import App from './app.vue'

import '@/styles/global.scss'
import router from './router'
import store from './store'

import '@/permission'

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#root')
