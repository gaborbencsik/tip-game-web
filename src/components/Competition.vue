<template class="container-fluid">
  <div v-if="authenticated" class="competition">
    <b-alert class="fixed"
             variant="danger"
             dismissible
             :show="error"
             @dismissed="error=false">
      <p>{{ error }}</p>
    </b-alert>
    <main>
      <button class="btn btn-primary" type="button" name="button" @click="logOrder">Save order</button>

      <div class="wrapper">
        <b-col cols="4" v-if="this.showTeams">
          <b-container fluid>
            <b-row class="team" v-for="( team, index ) in order" :key="team">
              <div class="team-ranking">
                <span>{{ index + 1 }}</span>
              </div>
              <div class="btn team-name"
                  draggable="true"
                  v-on:dragstart="dragstartHandler"
                  :data-matchid="team"
                  droppable="true" v-on:drop="dropHandler" v-on:dragover="dragoverHandler">
                <span :data-matchid="team">{{ team }}</span>
              </div>
            </b-row>
          </b-container>
        </b-col>
        <!-- Heki-Meki Start -->
        <b-col cols="4" v-if="!this.showTeams" v-on:touchmove="changeState" @mouseover="changeState">
          <b-container fluid>
            <b-row class="team" v-for="( team, index ) in orderTeams" :key="team">
              <div class="team-ranking">
                <span>{{ index + 1 }}</span>
              </div>
              <div class="btn team-name">
                <span :data-matchid="team">{{ team }}</span>
              </div>
            </b-row>
          </b-container>
        </b-col>
        <!-- Heki-Meki End -->
      </div>
    </main>
  </div>
</template>

<script>
// import axios from 'axios'

export default {
  name: 'competition',
  components: {
  },
  data () {
    return {
      order: [],
      showTeams: false
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
    orderTeams () {
      return this.$store.state.teams.map(team => team.shortName)
    }
  },
  methods: {
    log (e) {
      console.log(e)
    },
    logOrder () {
      console.log(this.order)
    },
    changeState () {
      this.showTeams = true
      this.mapTeams()
      console.log(this.showTeams)
    },
    mapTeams () {
      this.orderTeams.map(team => {
        this.order.push(team)
      })
    },
    dragstartHandler (ev) {
      ev.dataTransfer.setData('text/plain', ev.target.dataset.matchid)
    },
    dragoverHandler (ev) {
      ev.preventDefault()
      ev.dataTransfer.dropEffect = 'move'
    },
    dropHandler (ev) {
      ev.preventDefault()
      let draggedTeam = ev.dataTransfer.getData('text')
      let droppedTeam = ev.target.dataset.matchid

      this.addToOrder(draggedTeam, droppedTeam, this.order)
    },
    addToOrder (draggedTeam, droppedTeam, order) {
      let indexOfDragged = order.indexOf(draggedTeam)
      let indexOfDropped = order.indexOf(droppedTeam)

      order.splice(indexOfDragged, 1)
      order.splice(indexOfDropped, 0, draggedTeam)
      console.log(order)
    }
  },
  filters: {
    capitalize: function (name) {
      return name.charAt(0).toUpperCase() + name.slice(1)
    }
  },
  created: function () {
    // let id = localStorage.getItem('id')
    // this.$store.dispatch('getUser', id)
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
