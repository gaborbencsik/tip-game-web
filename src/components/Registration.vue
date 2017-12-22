<template>
  <div class="registration">
    <div class="">
      <h2>Registration</h2>

      <div class="alert alert-danger" v-if="error">
        <p>{{ error }}</p>
      </div>
      <div class="alert alert-success" v-if="success">
        <p>Your registration was successful.</p>
        <a class="alert-link login-text" @click="changeLoginState()">Login here!</a>
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
    </div>
    <h3 class="btn btn-link" @click="changeLoginState()">Login</h3>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'registration',
  data () {
    return {
      credentials: {
        name: '',
        password: '',
        email: ''
      },
      error: '',
      showLogin: false,
      success: false
    }
  },
  methods: {
    submit: function () {
      axios.post('/registration', {
        name: this.credentials.name,
        password: this.credentials.password,
        email: this.credentials.email
      })
      .then(response => {
        if (!response.data.success) {
          this.error = response.data.message
        } else {
          this.success = true
        }
      })
      .catch(error => {
        console.log(error)
      })
    },
    changeLoginState: function () {
      this.showLogin = !this.showLogin
      this.$store.commit('toggleLoginState', this.showLogin)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.alert {
  transition: opacity .5s
}

.login-text {
  cursor: pointer;
  text-decoration: underline;
}

</style>
