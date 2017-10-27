<template>
  <div class="registration">
    <div class="">
      <h2>Registration</h2>

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
          type="text"
          class="form-control"
          placeholder="Enter your email"
          v-model="credentials.email"
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
      <button class="btn btn-primary" @click="submit()">Register</button>
      <h3>{{ credentials.username }}</h3>
      <h3>{{ credentials.password }}</h3>
    </div>
  </div>
</template>

<script>
const ApiClient = require('../services/ApiClient.js')

export default {
  name: 'registration',
  data () {
    return {
      credentials: {
        username: '',
        password: '',
        email: ''
      },
      error: ''
    }
  },
  methods: {
    submit: function () {
      ApiClient.login(this.credentials)
      console.log(this.credentials.username)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
