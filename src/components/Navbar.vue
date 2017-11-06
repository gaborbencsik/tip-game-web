<template>
  <div class="navbar">
    <header class="container">
      <nav>
        <router-link class="btn" to="/home">Home</router-link>
        <router-link class="btn" to="/match-list">Match List</router-link>
        <router-link class="btn" to="/tips">Tips</router-link>
        <button class="btn" @click="logout()">Logout</button>
      </nav>
    </header>
  </div>
</template>

<script>
export default {
  name: 'navbar',
  data () {
    return {
    }
  },
  beforeCreate: function () {
    let token = localStorage.getItem('token')
    let authenticated = token !== ''
    this.$store.commit('authenticateUser', {token: token, authenticated: authenticated})
  },
  methods: {
    logout: function () {
      localStorage.removeItem('token')
      localStorage.setItem('authenticated', false)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
