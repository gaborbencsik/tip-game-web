<template class="container-fluid">
  <div v-if="authenticated" class="playerTips">
    <b-alert class="fixed"
             variant="danger"
             dismissible
             :show="error"
             @dismissed="error=false">
      <p>{{ error }}</p>
    </b-alert>
    <b-alert variant="success"
             dismissible
             @dismissed="success=false"
             :show="success">
      <p>Favourite team set successfully</p>
    </b-alert>
    <header>
      <h1>Player Tips</h1>
    </header>
    <main>
      <b-container fluid>
        <b-row class="list-item">
          <b-col cols="5" md="5">Top Scorer</b-col>
          <b-col cols="7" md="7" class="selector">
            <b-form-select v-model="selectedTopScorer" :options="getPlayers" class="select" :value="topScorer"></b-form-select>
            <button class="btn btn-primary" @click="setTopScorer()">Set</button>
          </b-col>
        </b-row>
      </b-container>
    </main>
  </div>
</template>

<script>
// import axios from 'axios'

export default {
  name: 'playerTips',
  data () {
    return {
      selectedTopScorer: null,
      selectedTeam: null,
      options: [],
      error: false,
      success: false
    }
  },
  computed: {
    authenticated () {
      return this.$store.state.user.authenticated
    },
    username () {
      return this.$store.state.user.name
    },
    getPlayers () {
      return [
        'Messi',
        'Ronaldo'
      ]
    },
    favouriteTeam () {
      if (this.$store.state.user.favouriteTeam === undefined) {
        this.selectedTeam = ''
      } else {
        this.selectedTeam = this.$store.state.user.favouriteTeam
      }
    },
    getUser () {
      return this.$store.state.user
    },
    getAvatarUrl () {
      return `https://avatars.dicebear.com/v1/male/${this.username}/50.png`
    },
    getTeams () {
      return this.$store.state.teams.map(team => {
        return {
          value: team.team,
          text: team.team
        }
      })
    }
  },
  methods: {
    setTopScorer () {
      console.log(this.selectedTopScorer)
      this.success = true
    },
    manage: function (data) {
      if (!data.success) {
        this.error = data.message
        this.success = false
      } else {
        this.success = true
      }
      // this.refreshState()
    }
  },
  filters: {
    capitalize: function (name) {
      return name.charAt(0).toUpperCase() + name.slice(1)
    }
  },
  created: function () {
    let id = localStorage.getItem('id')
    this.$store.dispatch('getUser', id)
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

h2 {
  margin-left: 1rem;
}

select {
  width: 70%;
  font-size: .9rem;
  height: 1rem;
  padding-top: 0;
  padding-bottom: 0;
}

/* DIRTY hack  */

select.form-control:not([size]):not([multiple]) {
  height: calc(1.5rem + 2px);
}

.list-item {
  padding-top: 10px;
  margin-top: 10px;
}

.list-item > div {
  display: flex;
  justify-content: center;
  flex-direction: column;
}

div.selector {
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
}

.selector > select,
.selector > button {
  width: 40%;
}

.selector > button {
  margin-left: 1rem;
}

</style>
