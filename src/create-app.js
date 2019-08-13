import Vue from 'vue'
import App from './app.vue'
import createRouter from './router'
import createStore from './store'

import './styles/global.scss'
// import './permission'

// 服务端每次请求都会渲染返回一个新的 app router store 实例，避免状态污染
export default () => {
  const router = createRouter()
  const store = createStore()
  const app = new Vue({
    router,
    store,
    render: h => h(App)
  })

  return {
    app,
    router,
    store
  }
}
