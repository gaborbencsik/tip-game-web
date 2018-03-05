<template>
  <div v-if="authenticated" class="matchList">
    <header>
      <p>Total Score: {{ score }}</p>
    </header>
    <main>
      <b-container fluid>
        <h2>Last matches</h2>
        <b-row class="list-head">
            <b-col cols="4" md="4">Team</b-col>
            <b-col cols="2" md="2">Result</b-col>
            <b-col cols="2" md="2">Tips</b-col>
            <b-col cols="2" md="2">Points</b-col>
            <b-col cols="2" md="2">Date</b-col>
        </b-row>
        <b-row :data-matchid="match.matchId" v-for="match in lastMatches" :key="match.matchId" class="list-item">
            <b-col cols="4" md="4">
              <div>{{ match.homeTeamName }}</div>
              <div>{{ match.awayTeamName }}</div>
            </b-col>
            <b-col cols="2" md="2">{{ match.homeGoals }} - {{ match.awayGoals }}</b-col>
            <b-col cols="2" md="2">{{ match.homeGoalsTip }} - {{ match.awayGoalsTip }}</b-col>
            <b-col cols="2" md="2">{{ match.score }}</b-col>
            <b-col cols="2" md="2">{{ match.date | changeDate }}</b-col>
        </b-row>
        <div class="all-matches-header">
          <h2>All matches</h2>
          <button class="btn btn-primary" @click="toggleMatches()">Show all matches</button>
        </div>
        <div v-show="allMatches">
          <b-row class="list-head">
            <b-col cols="4" md="4">Team</b-col>
            <b-col cols="2" md="2">Result</b-col>
            <b-col cols="2" md="2">Tips</b-col>
            <b-col cols="2" md="2">Points</b-col>
            <b-col cols="2" md="2">Date</b-col>
          </b-row>
          <b-row :data-matchid="match.matchId" v-for="match in orderedMatches" :key="match.matchId" class="list-item">
            <b-col cols="4" md="4">
              <div>{{ match.homeTeamName }}</div>
              <div>{{ match.awayTeamName }}</div>
            </b-col>
            <b-col cols="2" md="2">{{ match.homeGoals }} - {{ match.awayGoals }}</b-col>
            <b-col cols="2" md="2">{{ match.homeGoalsTip }} - {{ match.awayGoalsTip }}</b-col>
            <b-col cols="2" md="2">{{ match.score }}</b-col>
            <b-col cols="2" md="2">{{ match.date | changeDate }}</b-col>
          </b-row>
        </div>
      </b-container>
    </main>
  </div>
</template>

<script>
import _ from 'lodash'
import moment from 'moment'

export default {
  name: 'matchList',
  data () {
    return {
      allMatches: false
    }
  },
  methods: {
    toggleMatches () {
      this.allMatches = !this.allMatches
    }
  },
  computed: {
    authenticated () {
      return this.$store.state.user.authenticated
    },
    matches () {
      return this.$store.state.matches
    },
    orderedMatches () {
      return _.orderBy(this.matches, 'date')
    },
    lastMatches () {
      const TWO_DAYS_IN_MILISECONDS = 172800 * 1000
      const WEEK_IN_MILISECONDS = 604800 * 1000
      let now = Date.now() - TWO_DAYS_IN_MILISECONDS
      let weekFromNow = Date.now() + WEEK_IN_MILISECONDS
      let newList = []

      _.mapKeys(this.orderedMatches, function (value, key) {
        if (moment(value.date).isBetween(now, weekFromNow)) {
          newList.push(value)
        }
      })
      return newList
    },
    score () {
      return this.$store.state.user.score
    }
  },
  filters: {
    changeDate: function (value) {
      return moment(value).format('YYYY.MM.DD, HH:mm')
    }
  },
  created: function () {
    let id = localStorage.getItem('id')
    this.$store.dispatch('getMatchesWithTips', id)
    this.$store.dispatch('getCurrentScore', id)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

h2 {
  margin-top: 2rem;
}

main {
  margin-bottom: 3rem;
}

.all-matches-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2rem;
}

.list-item, .list-head {
  border-bottom: 1px solid black;
  padding-bottom: 10px;
  margin-bottom: 10px;
}

.list-head {
  padding-top: 10px;
  margin-top: 10px;
}

</style>
