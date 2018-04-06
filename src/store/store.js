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
      score: '',
      lastSeen: '',
      registration: '',
      favouriteTeam: ''
    },
    error: '',
    showLogin: true,
    matches: [],
    tips: [],
    teams: [],
    users: [],
    teamOrder: []
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

    setTotalScore: (state, score) => {
      state.user.score = score
    },

    setUser: (state, user) => {
      state.user.name = user.name
      state.user.score = user.score
      state.user.email = user.email
      state.user.lastSeen = user.lastSeen
      state.user.registration = user.registration
      state.user.favouriteTeam = user.favouriteTeam
    },

    setAllUsers: (state, users) => {
      state.users = users
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
        // context.commit('setTotalScore', matches.totalScore)
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

    getAllUsers (context, userId) {
      fetch(`/users`, {
        method: 'GET',
        headers: new Headers({
          'my-custom-header': this.state.user.token
        })
      }).then(response => {
        return response.json()
      }).then(data => {
        context.commit('setAllUsers', data.users)
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
    },

    getCurrentScore (context, userId) {
      fetch(`/user/${userId}/score`, {
        method: 'GET',
        headers: new Headers({
          'my-custom-header': this.state.user.token
        })
      }).then(response => {
        return response.json()
      }).then(score => {
        context.commit('setTotalScore', score.score)
      }).catch(error => {
        console.log('error', error)
      })
    }

  }
})
