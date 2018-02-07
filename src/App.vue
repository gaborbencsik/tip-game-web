<template>
  <div id="app">
    <div v-if="user.authenticated">
      <navbar></navbar>
    </div>
    <div v-else class="auth container">
      <div class="col-md-6 col-xs-8 col-xs-offset-2">
      <div v-if="showLoginState">
        <login></login>
      </div>
      <div v-else>
        <registration></registration>
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
  head: {
    meta: [
      { name: 'viewport', content: 'width=device-width, initial-scale=1, shrink-to-fit=no' }
    ]
  },
  computed: {
    user () {
      return this.$store.state.user
    },
    showLoginState () {
      return this.$store.state.showLogin
    },
    getToken () {
      return this.$store.state.user.token
    }
  },
  beforeCreate: function () {
    let token = localStorage.getItem('token')
    let name = localStorage.getItem('name')
    let authenticated = token
    this.$store.commit('authenticateUser', {token: token, authenticated: authenticated, name: name})
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.auth {
  margin-top: 60px;
}

header {
  margin-bottom: 2rem;
}

main, select {
  font-size: .9rem;
}

h1 {
  font-size: 2rem;
}

.row > [class^="col-"],
.row > [class*=" col-"] {
  padding-right: 0;
  padding-left: 0;
}

input {
  padding-left: inherit !important;
  width: 2rem;
  border: 1px solid #00000040;
  text-align: center;
  border-radius: 20%;
}

.input {
  width: 6rem;
}

button {
  cursor: pointer;
}

@media (max-width: 767px) {
  main {
    font-size: .7rem;
  }

  h1 {
    font-size: 1.5rem;
  }

  .btn.btn-primary,
  .btn.btn-success {
    font-size: .7rem;
  }

}

</style>
