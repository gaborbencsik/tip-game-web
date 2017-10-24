<template>
  <div id="app">
    <navbar>Loading...</navbar>
    <router-view class="container"></router-view>
  </div>
</template>

<script>
import {store} from './store/store'
import Navbar from './components/Navbar'

export default {
  store: store,
  name: 'app',
  components: {
    'navbar': Navbar
  }
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
