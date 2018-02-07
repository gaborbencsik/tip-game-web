<template>
  <div v-if="authenticated" class="home">
    <h2>{{ username | capitalize }}, welcome to Tip Game Club</h2>
    <p>Here you will see your stats and rankings.</p>
    <header>
      <h1>Ranking</h1>
    </header>
    <main>
      <b-container fluid>
        <b-row class="list-head">
          <b-col cols="1" md="1"></b-col>
          <b-col cols="2" md="2">User</b-col>
          <b-col cols="1" md="1">Score</b-col>
        </b-row>
        <b-row v-for="user, index in orderedUsers" :key="user.name" class="list-item">
          <b-col cols="1" md="1">{{ index + 1}}</b-col>
          <b-col cols="2" md="2">{{user.name}}</b-col>
          <b-col cols="1" md="1">{{user.score}}</b-col>
        </b-row>
      </b-container>

    </main>
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  name: 'home',
  data () {
    return {
    }
  },
  computed: {
    authenticated () {
      return this.$store.state.user.authenticated
    },
    username () {
      return this.$store.state.user.name
    },
    users () {
      return this.$store.state.users
    },
    orderedUsers () {
      return _.orderBy(this.users, 'score', 'desc')
    }
  },
  filters: {
    capitalize: function (name) {
      return name.charAt(0).toUpperCase() + name.slice(1)
    }
  },
  created: function () {
    this.$store.dispatch('getAllUsers')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.list-item, .list-head {
  /* border-bottom: 1px solid black; */
  padding-bottom: 10px;
  margin-bottom: 10px;
}

.list-head {
  padding-top: 10px;
  margin-top: 10px;
}
</style>
