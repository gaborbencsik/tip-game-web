<template>
  <div v-if="authenticated" class="matchList">
    <header>
      <h1>MatchList</h1>
      <p>Total Score: {{ totalScore }}</p>
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
      <!-- <b-container fluid class="">
        <b-row>
            <b-col cols="4" md="3">Home</b-col>
            <b-col cols="4" md="3">Away</b-col>
            <b-col cols="2" md="1">Result</b-col>
            <b-col cols="1" md="1">Tips</b-col>
            <b-col cols="1" md="1">Points</b-col>
            <b-col hidden-cols md="3" class="date">Date</b-col>
        </b-row>
        <b-row :data-matchid="match.matchId" v-for="match in orderedMatches" :key="match.matchId">
            <b-col cols="4" md="3">{{ match.homeTeamName }}</b-col>
            <b-col cols="4" md="3">{{ match.awayTeamName }}</b-col>
            <b-col cols="2" md="1">{{ match.homeGoals }} - {{ match.awayGoals }}</b-col>
            <b-col cols="1" md="1">{{ match.homeGoalsTip }} - {{ match.awayGoalsTip }}</b-col>
            <b-col cols="1" md="1">{{ match.score }}</b-col>
            <b-col hidden-cols md="3" class="date">{{ match.date | changeDate }}</b-col>
        </b-row>

      </b-container> -->

      <!-- <table class='table table-responsive-xl'>
        <thead>
          <tr>
            <th>Home</th>
            <th>Away</th>
            <th>Result</th>
            <th>MyTips</th>
            <th>Points</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          <tr :data-matchid="match.matchId" v-for="match in orderedMatches">
            <td>{{ match.homeTeamName }}</td>
            <td>{{ match.awayTeamName }}</td>
            <td>{{ match.homeGoals }} - {{ match.awayGoals }}</td>
            <td>{{ match.homeGoalsTip }} - {{ match.awayGoalsTip }}</td>
            <td class="score">{{ match.score }}</td>
            <td>{{ match.date | changeDate }}</td>
          </tr>
        </tbody>
      </table> -->
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
    totalScore () {
      return this.$store.state.totalScore
    }
  },
  filters: {
    changeDate: function (value) {
      // return moment(value).format('YYYY.MM.DD, dddd, HH:mm')
      return moment(value).format('YYYY.MM.DD, HH:mm')
    }
  },
  created: function () {
    let id = localStorage.getItem('id')
    // this.$store.dispatch('getMatches')
    this.$store.dispatch('getMatchesWithTips', id)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
td.results {
  width: 70px;
}

main {
  font-size: .9rem;
}

h1 {
  font-size: 2rem;
}

td.score {
  text-align: center;
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

@media (max-width: 767px) {
  main {
    font-size: .7rem;
  }

  h1 {
    font-size: 1.5rem;
  }

}

</style>
