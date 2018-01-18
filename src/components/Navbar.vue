<template>
  <div class="navbar">
    <header class="container">
      <nav>
        <router-link class="btn" to="/home">Home</router-link>
        <router-link class="btn" to="/match-list">Match List</router-link>
        <router-link class="btn" to="/tips">Tips</router-link>
      </nav>
      <nav>
        <router-link class="btn" to="/profile">Profile</router-link>
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
  computed: {
  },
  beforeCreate: function () {
    let token = localStorage.getItem('token')
    let name = localStorage.getItem('name')
    let authenticated = token !== ''
    this.$store.commit('authenticateUser', {token: token, authenticated: authenticated, name: name})
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

nav {
  display: flex
}

@media (max-width: 767px) {
  nav {
    flex-direction: column;
  }

}

</style>
