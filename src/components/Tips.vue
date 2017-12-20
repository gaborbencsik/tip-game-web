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
            <td>
              <input class="col-sx-1" v-model="match.homeGoals">
              <input class="col-sx-1" v-model="match.awayGoals">
            </td>
            <td>{{ match.lastModified | changeDate }}</td>
            <td>
              <button class="btn btn-primary">Save</button>
            </td>
          </tr>
        </tbody>
      </table>
    </main>
    <input type="number" name="" :value="getCount" ref="counter">
    <button type="button" name="button" v-on:click="set">set</button>
    <button type="button" name="button" v-on:click="increment">increment by one</button>
    <button type="button" name="button" v-on:click="decrement">decrement by one</button>
    <p>{{ getCount }}</p>

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
    },
    getCount () {
      return this.$store.state.count
    }
  },
  methods: {
    increment: function () {
      console.log('clicked')
      this.$store.commit('increment', 1)
    },
    decrement: function () {
      this.$store.commit('increment', -1)
    },
    set: function () {
      this.$store.commit('set', parseInt(this.$refs.counter.value))
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
    width: 3rem;
  }
</style>
