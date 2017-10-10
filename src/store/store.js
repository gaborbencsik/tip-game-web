import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  strict: true,
  state: {
    matches: {
      'catalog': [
        {
          'id': '2ce704a4-0796-442c-a2f1-572d93af5b9d',
          'homeTeamName': 'FC Bayern München',
          'awayTeamName': 'Bayer Leverkusen',
          'date': 1503081000,
          'matchday': 1,
          'homeGoals': 4,
          'awayGoals': 2
        },
        {
          'id': 'a84abab2-1799-401d-8432-317997489839',
          'homeTeamName': 'SC Freiburg',
          'awayTeamName': 'Eintracht Frankfurt',
          'date': 1503149400,
          'matchday': 1,
          'homeGoals': 2,
          'awayGoals': 2
        }
      ]
    },
    list: () => {
      return fetch('./catalog.json').then((response) => {
        console.log(response)
      })
    }
  },
  getters: {

  },
  mutations: {

  },
  actions: {

  }
})
