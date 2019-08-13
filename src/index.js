import Vue from 'vue'
import App from './app.vue'

import './styles/global.scss'
import createRouter from './router'
import createStore from './store'

import './permission'

const router = createRouter()
const store = createStore()

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#root')
