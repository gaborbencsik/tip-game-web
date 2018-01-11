<template>
  <div class="navbar">
    <header class="container">
      <nav>
        <router-link class="btn" to="/home">Home</router-link>
        <router-link class="btn" to="/match-list">Match List</router-link>
        <router-link class="btn" to="/tips">Tips</router-link>
        <logout></logout>
      </nav>
    </header>
  </div>
</template>

<script>
import Logout from './Logout'

export default {
  name: 'navbar',
  components: {
    'logout': Logout
  },
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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
