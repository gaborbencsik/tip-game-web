import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  strict: true,
  state: {
    count: 0,
    user: {
      authenticated: false
    },
    matches: [
      {
        'id': '162537',
        'homeTeamName': 'FC Bayern München',
        'awayTeamName': 'Bayer Leverkusen',
        'date': 1503081000,
        'matchday': 1,
        'homeGoals': 3,
        'awayGoals': 1,
        'halfTimeHomeGoals': 2,
        'halfTimeAwayGoals': 0,
        'status': 'FINISHED'
      },
      {
        'id': '162536',
        'homeTeamName': 'VfL Wolfsburg',
        'awayTeamName': 'Borussia Dortmund',
        'date': 1503149400,
        'matchday': 1,
        'homeGoals': 0,
        'awayGoals': 3,
        'halfTimeHomeGoals': 0,
        'halfTimeAwayGoals': 2,
        'status': 'FINISHED'
      }
    ],
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
    }
  },
  actions: {
    getMatches ({commit}) {
      console.log('1')
      // let mactList = () => {
      //   return fetch('http://localhost:4509/match-list', {
      //     method: 'GET'
      //   }).then(response => {
      //     console.log(response)
      //   }).catch(error => {
      //     console.log(error)
      //   })
      // }
      let list = [{
        'id': '162537',
        'homeTeamName': 'HAZAI',
        'awayTeamName': 'VENDÉG',
        'date': 1503081000,
        'matchday': 1,
        'homeGoals': 5,
        'awayGoals': 5,
        'halfTimeHomeGoals': 5,
        'halfTimeAwayGoals': 0,
        'status': 'FINISHED'
      }]
      setTimeout(() => {
        commit('setState', list)
        console.log('2')
      }, 500)
    }
  }
})
