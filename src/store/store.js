import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  strict: true,
  state: {
    user: {
      name: '',
      token: '',
      authenticated: false
    },
    error: '',
    showLogin: true,
    matches: [],
    tips: [],
    totalScore: 0
  },
  getters: {
  },
  mutations: {
    setState: (state, matches) => {
      state.matches = matches
    },

    setTips: (state, tips) => {
      state.tips = tips
    },

    setTotalScore: (state, totalScore) => {
      state.totalScore = totalScore
    },

    authenticateUser: (state, user) => {
      state.user.authenticated = user.authenticated
      state.user.token = user.token
      state.user.name = user.name
    },
    toggleLoginState: (state, showLogin) => {
      state.showLogin = showLogin
    }
  },
  actions: {
    // getMatches (context) {
    //   fetch('/matches', {
    //     method: 'GET',
    //     headers: new Headers({
    //       'my-custom-header': this.state.user.token
    //     })
    //   }).then(response => {
    //     return response.json()
    //   }).then(data => {
    //     context.commit('setState', data.data)
    //   }).catch(error => {
    //     console.log('error', error)
    //   })
    // },
    getMatchesWithTips (context, userId) {
      fetch(`/user/${userId}/matches`, {
        method: 'GET',
        headers: new Headers({
          'my-custom-header': this.state.user.token
        })
      }).then(response => {
        return response.json()
      }).then(data => {
        context.commit('setState', data.data)
        context.commit('setTotalScore', data.totalScore)
      }).catch(error => {
        console.log('error', error)
      })
    },
    getTips (context, userId) {
      fetch(`/user/${userId}/tips`, {
        method: 'GET',
        headers: new Headers({
          'my-custom-header': this.state.user.token
        })
      }).then(response => {
        return response.json()
      }).then(data => {
        context.commit('setTips', data)
      }).catch(error => {
        console.log('error', error)
      })
    }
  }
})
