import router from '@/router'
import store from '@/store'

router.beforeEach((to, from, next) => {
  if (to.path === '/admin' && !store.state.user.token) {
    next('/login?redirect=' + to.path)
  } else {
    next()
  }
})
