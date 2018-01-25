import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  strict: true,
  state: {
    user: {
      name: '',
      token: '',
      email: '',
      authenticated: false,
      score: 0,
      lastSeen: '',
      registration: ''
    },
    error: '',
    showLogin: true,
    matches: [],
    tips: [],
    teams: []
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

    setUser: (state, user) => {
      state.user.name = user.name
      state.user.score = user.score
      state.user.email = user.email
      state.user.lastSeen = user.lastSeen
      state.user.registration = user.registration
    },

    setTeamList: (state, teams) => {
      state.teams = teams
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
    //   fetch('/competition/matches', {
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
      fetch(`/user/${userId}/competition/matches`, {
        method: 'GET',
        headers: new Headers({
          'my-custom-header': this.state.user.token
        })
      }).then(response => {
        return response.json()
      }).then(matches => {
        context.commit('setState', matches.data)
        context.commit('setTotalScore', matches.totalScore)
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
      }).then(tips => {
        context.commit('setTips', tips)
      }).catch(error => {
        console.log('error', error)
      })
    },

    getUser (context, userId) {
      fetch(`/user/${userId}/profile`, {
        method: 'GET',
        headers: new Headers({
          'my-custom-header': this.state.user.token
        })
      }).then(response => {
        return response.json()
      }).then(profile => {
        context.commit('setUser', profile.user)
      }).catch(error => {
        console.log('error', error)
      })
    },

    getTeams (context) {
      fetch(`/competition/teams`, {
        method: 'GET',
        headers: new Headers({
          'my-custom-header': this.state.user.token
        })
      }).then(response => {
        return response.json()
      }).then(teams => {
        context.commit('setTeamList', teams.data)
      }).catch(error => {
        console.log('error', error)
      })
    }

  }
})
