import axios from 'axios'

export default {
  state: {
    token: ''
  },
  mutations: {
    SET_TOKEN (state, token) {
      state.token = token
    }
  },
  getters: {
    isLogin (state) {
      return !!state.token
    }
  },
  actions: {
    login ({ commit, getters }, u) {
      return axios.post('/api/login', u).then(res => {
        const { token } = res.data
        if (token) {
          commit('SET_TOKEN', token)
        }
        return getters.isLogin
      })
    }
  }
}
