<template>
  <div id="app">
    <header class="container">
      <nav>
        <router-link class="btn" to="/">Home</router-link>
        <router-link class="btn" to="/match-list">Match List</router-link>
        <router-link class="btn" to="/tips">Tips</router-link>
      </nav>
    </header>
    <router-view class="container"></router-view>
  </div>
</template>

<script>
import {store} from './store/store'

export default {
  store: store,
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}

header {
  margin-bottom: 2rem;
}
</style>
