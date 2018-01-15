<template>
  <div v-if="authenticated" class="profile">
    <header>
      <img src="https://avatars.dicebear.com/v1/male/gabor/50.png" v-bind:title="username | capitalize">
      <h2>{{ username | capitalize }}</h2>
    </header>
    <p>Here you will see your profile details.</p>
  </div>
</template>

<script>
export default {
  name: 'profile',
  data () {
    return {
    }
  },
  computed: {
    authenticated () {
      return this.$store.state.user.authenticated
    },
    username () {
      return this.$store.state.user.name
    },
    getUser () {
      return this.$store.state.user
    }
  },
  filters: {
    capitalize: function (name) {
      return name.charAt(0).toUpperCase() + name.slice(1)
    }
  },
  created: function () {
    let id = localStorage.getItem('id')
    this.$store.dispatch('getUser', id)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
