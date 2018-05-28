<template>
  <div v-if="authenticated" class="home">
    <h2>{{ username | capitalize }}, welcome to Tip Game Club</h2>
    <p>Here you will see your stats and rankings.</p>
    <header>
      <h1>Ranking</h1>
    </header>
    <main>
      <b-container fluid class="wrapper">
        <b-col cols="6" md="6">
          <b-row class="list-head">
            <b-col cols="1" md="1">#</b-col>
            <b-col cols="3" md="3">User</b-col>
            <b-col cols="1" md="1">Score</b-col>
          </b-row>
          <b-row v-for="user, index in orderedUsers" :key="user.name" class="list-item">
            <b-col cols="1" md="1">{{ index + 1}}</b-col>
            <b-col cols="3" md="3">{{user.name}}</b-col>
            <b-col cols="1" md="1">{{user.score}}</b-col>
          </b-row>
        </b-col>
        <b-col cols="6" md="6">
          <b-row v-if="english" class="rules">
            <h2>Rules</h2>
            <div class="rule-list">
              <b-row v-for="rule in this.rules" :key="rule">
                <b-col cols="4" md="4" class="rule-list-item">{{rule.score}}</b-col>
                <b-col cols="8" md="8">{{rule.content}}</b-col>
              </b-row>
            </div>
          </b-row>
          <b-row v-else class="rules">
            <h2>Szabályok</h2>
          </b-row>
        </b-col>
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
      english: true,
      rules: [
        {score: '1', content: 'Three-way tip (1,2,X)'},
        {score: '3', content: 'Accurate result (e.g. 2-1, 1-2, 1-1)'},
        {score: 'double score', content: 'Successful favourite team tip'}
      ]
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

.wrapper {
  display: flex;
}

.rules,
.rule-list {
  display: flex;
  flex-direction: column;
}

.rule-list-item {
  text-align: center;
  font-weight: bold;
}

</style>
