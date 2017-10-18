<template>
  <div class="matchList">
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
          <tr v-for="match in matches">
            <!-- each match in catalog -->
            <td>{{ match.homeTeamName }}</td>
            <td>{{ match.awayTeamName }}</td>
            <td>
              <span>{{ match.homeGoals }} - </span>
              <span>{{ match.awayGoals }}</span>
            </td>
            <td>
              <span>({{ match.halfTimeHomeGoals }} - </span>
              <span>{{ match.halfTimeAwayGoals }})</span>
            </td>
            <td>{{ match.date }}</td>
          </tr>
        </tbody>

      </table>

    </main>
  </div>
</template>

<script>
export default {
  name: 'matchList',
  computed: {
    matches () {
      return this.$store.state.matches
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
