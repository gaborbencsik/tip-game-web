import Vue from 'vue'
import Vuex from 'vuex'
import ApiClient from '../services/apiClient'

Vue.use(Vuex)

export const store = new Vuex.Store({
  strict: true,
  state: {
    // matches: [],
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
      state.products = matches
    }
  },
  actions: {
    getMatches: context => {
      ApiClient.getMatches().then(() => {
        context.commit('setState')
      })
    }
  }
})
