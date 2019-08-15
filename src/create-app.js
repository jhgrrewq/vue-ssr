import Vue from 'vue'
import App from './app.vue'
import createRouter from './router'
import createStore from './store'

import { sync } from 'vuex-router-sync'

import './styles/global.scss'
// import './permission'

// 服务端每次请求都会渲染返回一个新的 app router store 实例，避免状态污染
export default () => {
  const router = createRouter()
  const store = createStore()

  // 在挂载 (mount) 到客户端应用程序之前，需要获取到与服务器端应用程序完全相同的数据
  // 服务器端可以在渲染之前预取数据，并将数据填充到 store 中
  // 客户端同步路由状态(route state)到 store
  sync(store, router)

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
