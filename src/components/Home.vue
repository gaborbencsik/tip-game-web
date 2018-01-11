<template>
  <div v-if="authenticated" class="home">
    <h2>{{ username | capitalize }}, welcome to Tip Game Club</h2>
    <p>Here you will see your stats and rankings.</p>
  </div>
</template>

<script>
export default {
  name: 'home',
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
    }
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
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
