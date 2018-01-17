<template>
  <div v-if="authenticated" class="matchList">
    <header>
      <h1>MatchList</h1>
      <p>Total Score: {{ totalScore }}</p>
    </header>
    <main>
      <table class='table table-responsive-xl'>
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
      </table>
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
      return moment(value).format('YYYY.MM.DD, dddd, HH:mm')
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

td.score {
  text-align: center;
}

</style>
