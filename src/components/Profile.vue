<template class="container-fluid">
  <div v-if="authenticated" class="profile">
    <header>
      <img v-bind:src="getAvatarUrl" v-bind:title="username">
      <h2>{{ username | capitalize }}</h2>
    </header>
    <main>
      <b-container fluid>
        <b-row class="list-item">
            <b-col cols="5" md="5">Username</b-col>
            <b-col cols="7" md="7">{{ getUser.name }}</b-col>
        </b-row>
        <b-row class="list-item">
            <b-col cols="5" md="5">Email</b-col>
            <b-col cols="7" md="7">{{ getUser.email }}</b-col>
        </b-row>
        <b-row class="list-item">
            <b-col cols="5" md="5">Score</b-col>
            <b-col cols="7" md="7">{{ getUser.score }}</b-col>
        </b-row>
        <b-row class="list-item">
            <b-col cols="5" md="5">Favourite Team</b-col>
            <b-col cols="7" md="7" class="favourite-team-selector">
              <b-form-select v-model="selectedTeam" :options="getTeams" class="select"></b-form-select>
              <button class="btn btn-primary" @click="setFavouriteTeam()">Set</button>
            </b-col>
        </b-row>
      </b-container>
      {{ getUser }}
    </main>
  </div>
</template>

<script>
export default {
  name: 'profile',
  data () {
    return {
      selectedTeam: null,
      options: []
    }
  },
  computed: {
    authenticated () {
      return this.$store.state.user.authenticated
    },
    username () {
      return this.$store.state.user.name
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
          value: team.code,
          text: team.shortName
        }
      })
    }
  },
  methods: {
    setFavouriteTeam () {
      console.log(this.selectedTeam)
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

input {
  width: 6rem;
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

div.favourite-team-selector {
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
}

.favourite-team-selector > select,
.favourite-team-selector > button {
  width: 40%;
}

.favourite-team-selector > button {
  margin-left: 1rem;
}

</style>
