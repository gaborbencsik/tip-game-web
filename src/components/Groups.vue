<template class="container-fluid">
  <div v-if="authenticated" class="groups">
    <b-alert class="fixed"
        variant="danger"
        dismissible
        :show="error"
        @dismissed="error=false">
      <p>{{ error }}</p>
    </b-alert>
    <main>
      <h1>Groups</h1>
      <div class="wrapper">
        <b-col cols="12" md="6" v-for="(teams, groupName) in groups" :key="groupName">
          <h3>{{groupName}}</h3>
          <div v-for="team in teams" :key="team.team" class="team">
            <b-col cols="5" md="5">{{team.team}}</b-col>
            <b-col cols="1" md="1">{{team.playedGames}}</b-col>
            <b-col cols="1" md="1">{{team.goals}}</b-col>
            <b-col cols="1" md="1">{{team.goalsAgainst}}</b-col>
            <b-col cols="1" md="1">{{team.goalDifference}}</b-col>
            <b-col cols="1" md="1">{{team.points}}</b-col>
          </div>
        </b-col>
      </div>
    </main>
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  name: 'groups',
  components: {
  },
  data () {
    return {
      error: false
    }
  },
  computed: {
    authenticated () {
      return this.$store.state.user.authenticated
    },
    favouriteTeam () {
      return this.$store.state.user.favouriteTeam
    },
    user () {
      return this.$store.state.user
    },
    teams () {
      return this.$store.state.teams
    },
    groups () {
      return _.groupBy(this.teams, 'group')
    }
  },
  methods: {
    mapTeams () {
      this.orderTeams.map(team => {
        this.order.push(team)
      })
    }
  },
  filters: {
    capitalize: function (name) {
      return name.charAt(0).toUpperCase() + name.slice(1)
    }
  },
  created: function () {
    let id = localStorage.getItem('id')
    console.log(id)
    this.$store.dispatch('getTeams')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

main {
  font-size: .9rem;
}

header {
  display: flex;
  align-items: center;
}

.team {
  display: flex;
  flex-direction: row;
}

.wrapper {
  display: flex;
  margin-top: 2rem;
  flex-flow: row wrap;
}

.wrapper > div {
  margin-bottom: 10px;
}

</style>
