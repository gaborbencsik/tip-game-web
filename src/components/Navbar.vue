<template>
  <div class="navbar">
    <header class="container">
      <nav>
        <router-link class="btn" to="/home">Home</router-link>
        <router-link class="btn" to="/match-list">Match List</router-link>
        <router-link class="btn" to="/tips">Tips</router-link>
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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
