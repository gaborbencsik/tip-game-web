<template>
  <div class="matchList container-fluid">
    <h1>My Tips</h1>
    <main>
      <table class='table table-responsive'>
        <thead>

          <tr>
            <th>Home</th>
            <th>Away</th>
            <th>Tip</th>
            <th>Last modified</th>
            <th>
              <button class="btn btn-success" type="button" name="button" disabled>Save all</button>
            </th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="match in tips">
            <!-- each match in catalog -->
            <td>{{ match.homeTeamName }}</td>
            <td>{{ match.awayTeamName }}</td>
            <td>
              <input class="col-sx-1">
              <input class="col-sx-1">
            </td>
            <td>{{ match.date }}</td>
            <td>
              <button class="btn btn-primary">Save</button>
            </td>
          </tr>
        </tbody>

      </table>

    </main>

  </div>
</template>

<script>
export default {
  name: 'tips',
  computed: {
    matches () {
      return this.$store.state.matches
    },
    tips () {
      let matchData = this.$store.state.matches.map(match => {
        return {
          id: match.id,
          homeTeamName: match.homeTeamName,
          awayTeamName: match.awayTeamName,
          date: match.tipTimestamp
        }
      })
      return matchData
      // let tipData = this.$store.state.tips
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  input {
    padding-left: inherit !important;
    width: 3rem;
  }
</style>
