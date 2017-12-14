import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  strict: true,
  state: {
    count: 0,
    user: {
      token: '',
      authenticated: false
    },
    showLogin: true,
    matches: [],
    tips: [
      {
        'userId': '2',
        'id': '162537',
        'homeGoals': '4',
        'awayGoals': '4',
        'tipTimestamp': 1506441882776
      },
      {
        'userId': '2',
        'id': '162536',
        'homeGoals': '3',
        'awayGoals': '5',
        'tipTimestamp': 1506441819019
      }
    ]
  },
  getters: {

  },
  mutations: {
    setState: (state, matches) => {
      state.matches = matches
    },

    increment: (state, count) => {
      state.count += count
    },

    decrement: (state, count) => {
      state.count -= count
    },

    set: (state, count) => {
      state.count = count
    },

    authenticateUser: (state, user) => {
      state.user.authenticated = user.authenticated
      state.user.token = user.token
    },
    toggleLoginState: (state, showLogin) => {
      state.showLogin = showLogin
    }
  },
  actions: {
    getMatches (context) {
      fetch('/matches', {
        method: 'GET'
      }).then(response => {
        return response.json()
      }).then(data => {
        context.commit('setState', data)
      }).catch(error => {
        console.log(error)
      })
    }
  }
})
