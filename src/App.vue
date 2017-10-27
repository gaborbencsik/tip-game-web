<template>
  <div id="app">
    {{ user.authenticated }}
    <div v-if="user.authenticated">
      <navbar></navbar>
      <router-view class="container"></router-view>
    </div>
    <div v-else>
      <home></home>
      <login></login>
    </div>
  </div>
</template>

<script>
import {store} from './store/store'
import Navbar from './components/Navbar'
import Login from './components/Login'
import Home from './components/Home'

export default {
  store: store,
  name: 'app',
  components: {
    'navbar': Navbar,
    'login': Login,
    'home': Home
  },
  computed: {
    user () {
      return this.$store.state.user
    }
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
