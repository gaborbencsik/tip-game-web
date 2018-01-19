<template>
  <div class="login">
    <div class="">
      <h2>Log In</h2>

      <b-alert variant="danger"
               dismissible
               :show="error"
               @dismissed="error=false">
        <p>{{ error }}</p>
      </b-alert>
      <div class="form-group">
        <input
          type="text"
          class="form-control"
          placeholder="Enter your username"
          v-model="credentials.name"
        >
      </div>
      <div class="form-group">
        <input
          type="password"
          class="form-control"
          placeholder="Enter your password"
          v-model="credentials.password"
        >
      </div>
      <button class="btn btn-primary" @click="submit()">Login</button>
    </div>
    <h3 class="btn btn-link" @click="goToRegister()">Not registered yet?</h3>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'login',
  data () {
    return {
      credentials: {
        name: '',
        password: ''
      },
      error: false,
      showLogin: true
    }
  },
  methods: {
    submit: function () {
      axios.post('/login', {
        name: this.credentials.name,
        password: this.credentials.password
      })
      .then(response => {
        if (!response.data.success) {
          this.error = response.data.message
        } else {
          this.authenticateUser(response.data.token, response.data.name)
          localStorage.setItem('token', response.data.token)
          localStorage.setItem('id', response.data.id)
          localStorage.setItem('name', response.data.name)
        }
      })
      .catch(error => {
        console.log(error)
      })
    },
    goToRegister: function () {
      this.showLogin = !this.showLogin
      this.$store.commit('toggleLoginState', this.showLogin)
    },
    authenticateUser: function (token, name) {
      let user = {token: token, authenticated: true, name: name}
      this.$store.commit('authenticateUser', user)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

h3 {
  cursor: pointer;
}

</style>
