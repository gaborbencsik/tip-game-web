<template>
  <div id="app">
    {{ user.authenticated }}
    <div v-if="user.authenticated">
      <navbar></navbar>
    </div>
    <div v-else class="row container-fluid">
      <div class="col-md-6 col-xs-8 col-xs-offset-2">
        <login></login>
      </div>
      <div class="col-md-6 col-xs-8 col-xs-offset-2">
        <registration></registration>
      </div>
    </div>
    <router-view class="container"></router-view>
  </div>
</template>

<script>
import {store} from './store/store'
import Navbar from './components/Navbar'
import Login from './components/Login'
import Home from './components/Home'
import Registration from './components/Registration'

export default {
  store: store,
  name: 'app',
  components: {
    'navbar': Navbar,
    'login': Login,
    'home': Home,
    'registration': Registration
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
