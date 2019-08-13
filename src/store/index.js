import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user.js'

Vue.use(Vuex)

export default () => {
  return new Vuex.Store({
    modules: {
      user
    }
  })
}
