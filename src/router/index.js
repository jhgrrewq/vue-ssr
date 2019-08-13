import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default () => {
  return new Router({
    routes: [{
      path: '/login',
      component: () => import('../views/login.vue'),
      name: 'login'
    }, {
      path: '/',
      redirect: '/list',
      component: () => import('../layout/index.vue'),
      name: 'index',
      children: [{
        path: '/list',
        component: () => import('../views/list.vue'),
        name: 'list'
      }, {
        path: '/detail/:id',
        component: () => import('../views/detail.vue'),
        name: 'detail'
      }, {
        path: '/admin',
        component: () => import('../views/admin.vue'),
        name: 'admin'
      }]
    }]
  })
}
