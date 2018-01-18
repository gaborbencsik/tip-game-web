<template>
  <div v-if="authenticated" class="matchList container-fluid">
    <div class="alert alert-danger" v-if="error">
      <p>{{ error }}</p>
    </div>
    <header>
      <h1>My Tips</h1>
    </header>
    <main>
      <b-container fluid>
        <b-row class="list-head">
            <b-col cols="4" md="4">Team</b-col>
            <b-col cols="2" md="2">Tip</b-col>
            <b-col class="time" cols="2" md="2">Last modified</b-col>
            <b-col class="time" cols="2" md="2">Time left</b-col>
            <b-col cols="2" md="2"><button class="btn btn-success" type="button" name="button" disabled>Save all</button></b-col>
        </b-row>
        <b-row :data-matchid="match.matchId" v-for="match in tips" :key="match.matchId" class="list-item">
            <b-col cols="4" md="4">
              <div>{{ match.homeTeamName }}</div>
              <div>{{ match.awayTeamName }}</div>
            </b-col>
            <b-col cols="2" md="2" class="input">
              <input v-model="match.homeGoals">
              <input v-model="match.awayGoals">
            </b-col>
            <b-col class="time" cols="2" md="2">{{ match.lastModified | changeDate }}</b-col>
            <b-col class="time" cols="2" md="2">{{ match.date | timeLeft }}</b-col>
            <b-col cols="2" md="2">
              <button class="btn btn-primary" @click="saveSingleTip(match.homeGoals, match.awayGoals, match.matchId)">Save</button>
            </b-col>
        </b-row>

      </b-container>
    </main>
  </div>
</template>

<script>
import axios from 'axios'
import _ from 'lodash'
import moment from 'moment'

export default {
  name: 'tips',
  data () {
    return {
      error: ''
    }
  },
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
      let userId = localStorage.getItem('id')
      let payload = {
        homeGoals: parseInt(homeGoals),
        awayGoals: parseInt(awayGoals)
      }
      axios.put(`/user/${userId}/matches/${matchId}`,
        payload,
        {headers: {'my-custom-header': this.$store.state.user.token}
        }).then(response => {
          this.manage(response.data)
        }).catch(error => {
          console.log('error', error)
        })
    },
    manage: function (data) {
      if (!data.success) {
        this.error = data.message
      }
      this.refreshState()
    },
    refreshState: function () {
      let id = localStorage.getItem('id')
      this.$store.dispatch('getTips', id)
    }
  },
  filters: {
    changeDate: function (value) {
      if (value === undefined) {
        return ''
      } else {
        return moment(value).format('YYYY.MM.DD, dddd, HH:mm') !== 'Invalid date' ? moment(value).fromNow() : ''
      }
    },
    timeLeft: function (value) {
      let eventDate = new Date(value).getTime()
      let currentDate = Date.now()
      let difference = eventDate - currentDate
      return moment.duration().subtract(difference).humanize()
    }
  },
  created: function () {
    this.refreshState()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  input {
    padding-left: inherit !important;
    width: 2rem;
    border: 1px solid #00000040;
    text-align: center;
    border-radius: 20%;
  }

  .input {
    width: 6rem;
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

  .list-head > div {
    display: flex;
    justify-content: center;
    flex-direction: column;
  }

  .time {
    text-align: center;
  }

</style>
