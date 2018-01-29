<template>
  <div v-if="authenticated" class="matchList">
    <header>
      <h1>MatchList</h1>
      <p>Total Score: {{ score }}</p>
    </header>
    <main>
      <b-container fluid>
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

      </b-container>
    </main>
  </div>
</template>

<script>
import _ from 'lodash'
import moment from 'moment'

export default {
  name: 'matchList',
  computed: {
    matches () {
      return this.$store.state.matches
    },
    authenticated () {
      return this.$store.state.user.authenticated
    },
    orderedMatches () {
      return _.orderBy(this.matches, 'date')
    },
    score () {
      console.log('matcht list compontent', this.$store.state.user.score)
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
    // this.$store.dispatch('getMatches')
    this.$store.dispatch('getMatchesWithTips', id)
    this.$store.dispatch('getCurrentScore', id)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

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
