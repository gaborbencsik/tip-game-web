<template>
  <div id="app">
    {{ user.authenticated }}
    <div v-if="user.authenticated">
      <navbar></navbar>
    </div>
    <div v-else class="row container-fluid">
      <div class="col-md-6 col-xs-8 col-xs-offset-2">
      <div v-if="showLoginState">
        <login></login>
      </div>
      <div v-else>
        <registration @showReg="this.showLogin"></registration>
      </div>
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
    },
    showLoginState () {
      console.log(this.$store.state.showLogin)
      return this.$store.state.showLogin
    }
  },
  beforeCreate: function () {
    let token = localStorage.getItem('token')
    let authenticated = token
    this.$store.commit('authenticateUser', {token: token, authenticated: authenticated})
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
