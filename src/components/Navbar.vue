<template>
  <div class="navbar">
    <header class="container">
      <nav>
        <router-link class="btn" to="/home">Home</router-link>
        <router-link class="btn" to="/match-list">Match List</router-link>
        <router-link class="btn" to="/tips">Tips</router-link>
        <!-- <router-link class="btn" to="/competition">Competition</router-link> -->
        <!-- <router-link class="btn" to="/groups">Groups</router-link> -->
      </nav>
      <nav>
        <router-link class="btn" to="/profile">
          <img v-bind:src="getAvatarUrl" v-bind:title="username">
          {{ username | capitalize }}
        </router-link>
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
    username () {
      return this.$store.state.user.name
    },
    getAvatarUrl () {
      return `https://avatars.dicebear.com/v1/male/${this.username}/25.png`
    }
  },
  beforeCreate: function () {
    let token = localStorage.getItem('token')
    let name = localStorage.getItem('name')
    let authenticated = token !== ''
    this.$store.commit('authenticateUser', {token: token, authenticated: authenticated, name: name})
  },
  methods: {
  },
  filters: {
    capitalize: function (name) {
      return name.charAt(0).toUpperCase() + name.slice(1)
    }
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
