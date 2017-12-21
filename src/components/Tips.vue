<template>
  <div v-if="authenticated" class="matchList container-fluid">
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
            <td class="input">
              <input class="col-sx-1" v-model="match.homeGoals">
              <input class="col-sx-1" v-model="match.awayGoals">
            </td>
            <!-- <td>{{ match.lastModified | changeDate }}</td> -->
            <td>{{ match.homeGoals }}</td>
            <td>
              <button class="btn btn-primary" @click="saveSingleTip(match.homeGoals, match.awayGoals, match.matchId)">Save</button>
            </td>
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
  name: 'tips',
  computed: {
    matches () {
      return this.$store.state.matches
    },
    authenticated () {
      return this.$store.state.user.authenticated
    },
    tips () {
      return _.orderBy(this.$store.state.tips, 'date')
    }
  },
  methods: {
    saveSingleTip: function (homeGoals, awayGoals, matchId) {
      console.log(homeGoals, awayGoals, matchId, localStorage.getItem('id'))
      let userId = localStorage.getItem('id')
      let payload = {
        homeGoals: parseInt(homeGoals),
        awayGoals: parseInt(awayGoals)
      }
      console.log(payload, userId)

      fetch(`/user/${userId}/matches/${matchId}`, {
        method: 'PUT',
        headers: new Headers({
          'my-custom-header': this.$store.state.user.token
        }),
        body: JSON.stringify(payload)
      }).then(response => {
        console.log(response)
      }).catch(error => {
        console.log('error', error)
      })
    }
  },
  filters: {
    changeDate: function (value) {
      return moment(value).format('YYYY.MM.DD, dddd, HH:mm') !== 'Invalid date' ? moment(value).format('YYYY.MM.DD, dddd, HH:mm') : ''
    }
  },
  created: function () {
    let id = localStorage.getItem('id')
    this.$store.dispatch('getTips', id)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  input {
    padding-left: inherit !important;
    width: 2rem;
  }

  .input {
    width: 6rem;
  }

</style>
