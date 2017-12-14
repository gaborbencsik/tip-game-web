<template>
  <div v-if="authenticated" class="matchList">
    <h1>MatchList</h1>
    <main>
      <table class='table table-responsive'>
        <thead>

          <tr>
            <th>Home</th>
            <th>Away</th>
            <th>Result</th>
            <th>Halftime</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          <tr :data-matchid="match.matchId" v-for="match in orderedMatches">
            <!-- each match in catalog -->
            <td>{{ match.homeTeamName }}</td>
            <td>{{ match.awayTeamName }}</td>
            <td>
              <span>{{ match.homeGoals }}</span>
              <span> - </span>
              <span>{{ match.awayGoals }}</span>
            </td>
            <td>
              <span>({{ match.halfTimeHomeGoals }}</span>
              <span> - </span>
              <span>{{ match.halfTimeAwayGoals }})</span>
            </td>
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
      console.log(this.matches)
      return _.orderBy(this.matches, 'date')
    }
  },
  filters: {
    changeDate: function (value) {
      return moment(value).format('YYYY.MM.DD, dddd, HH:mm')
    }
  },
  created: function () {
    this.$store.dispatch('getMatches')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>



</style>
