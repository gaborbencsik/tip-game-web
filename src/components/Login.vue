<template>
  <div class="login">
    <!-- <div class="col-md-4 col-md-offset-4 col-xs-8 col-xs-offset-2"> -->
    <div class="">
      <h2>Log In</h2>

      <div class="alert alert-danger" v-if="error">
        <p>{{ error }}</p>
      </div>
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
    <!-- <router-link class="btn" to="/register">Not registered yet?</router-link> -->
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
      error: '',
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
          this.authenticateUser(response.data.token)
          localStorage.setItem('token', response.data.token)
          localStorage.setItem('id', response.data.id)
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
    authenticateUser: function (token) {
      let user = {token: token, authenticated: true}
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
