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
    </div>
    <h3 class="btn btn-link" @click="goToLogin()">Login</h3>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'registration',
  data () {
    return {
      credentials: {
        username: '',
        password: '',
        email: ''
      },
      error: '',
      showLogin: false
    }
  },
  methods: {
    submit: function () {
      console.log(this.credentials)
      axios.post(`http://localhost:4509/registration`, {
        username: this.credentials.username,
        password: this.credentials.password,
        email: this.credentials.email
      })
      .then(response => {
        if (response.data.error) {
          this.credentials = {}
          this.error = response.data.error
        }
      })
      .catch(error => {
        console.log(error)
      })
    },
    goToLogin: function () {
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

</style>
