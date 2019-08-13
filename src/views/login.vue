<template>
  <div>
    <h2>用户登录</h2>
    <input v-model="user.username"/>
    <input type="password" v-model="user.password"/>
    <button @click="onLogin">登录</button>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      user: {
        username: "",
        password: ""
      }
    }
  },
  methods: {
    ...mapActions([
      'login'
    ]),
    onLogin() { 
      this.login(this.user).then(ok => {
        if (ok) {
          const redirect = this.$route.query.redirect || "/"
          this.$router.push(redirect);
        }
      })
    }
  }
}
</script>