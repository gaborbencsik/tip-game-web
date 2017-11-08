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
          v-model="credentials.username"
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
    <h3 class="btn btn-link">Not registered yet?</h3>
    <!-- <router-link class="btn" to="/register">Not registered yet?</router-link> -->
  </div>
</template>

<script>
import axios from 'axios'
// import ApiClient from '/Users/gbencsik/Practise/tip-game-web/src/services/ApiClient.js' // RELATIVE_URL?
// const ApiClient = require('../services/ApiClient.js')

export default {
  name: 'login',
  data () {
    return {
      credentials: {
        username: '',
        password: ''
      },
      error: ''
    }
  },
  methods: {
    submit: function () {
      // ApiClient.register(this.credentials)
      axios.post(`${process.env.BASE_URL}/login`, {
        username: this.credentials.username,
        password: this.credentials.password
      })
      .then(response => {
        console.log(response)
        if (!response.data.success) {
          this.error = response.data.message
        } else {
          this.authenticateUser()
          localStorage.setItem('token', response.data.token)
          localStorage.setItem('id', response.data.id)
        }
      })
      .catch(error => {
        console.log(error)
      })
    },
    authenticateUser: function () {
      let user = {token: 'hello', authenticated: true}
      this.$store.commit('authenticateUser', user)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

h3 .btn {
  cursor: pointer;
}

</style>
