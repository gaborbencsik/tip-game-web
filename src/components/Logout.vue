<template>
  <div class="logout">
    <button class="btn btn-danger" type="button" name="button" @click="logout()">Logout</button>
  </div>
</template>

<script>
export default {
  name: 'logout',
  data () {
    return {
    }
  },
  methods: {
    logout: function () {
      localStorage.removeItem('token')
      localStorage.setItem('authenticated', false)
      let user = {token: null, authenticated: false}
      this.$store.commit('authenticateUser', user)
      this.routeToHome()
    },
    routeToHome: function () {
      this.$router.push({ path: 'home' })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.logout {
    display: inline-block;
}

</style>
