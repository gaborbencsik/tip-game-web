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
      <h1>groups</h1>

      {{ groups["A"] }}

    </main>
  </div>
</template>

<script>
// import axios from 'axios'
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
      console.log(this.$store.state.teams)
      return this.$store.state.teams
    },
    groups () {
      let mapped = _.keyBy(this.teams, 'group')
      console.log(mapped)
      console.log(mapped['A'])
      return _.keyBy(this.teams, 'group')
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

h2 {
  margin-left: 1rem;
}

.team {
  margin-bottom: 1rem;
}

.team-ranking {
  display: flex;
  align-items: center;
  width: 1rem;
  margin-right: 1rem;
}

.team-name {
  cursor: pointer;
  border: 1px solid #000;
  width: 8rem;
  background-color: #fff;
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

.wrapper {
  display: flex;
  margin-top: 2rem;
}

</style>
