<template class="container-fluid">
  <div v-if="authenticated" class="tables">
    <b-alert class="fixed"
        variant="danger"
        dismissible
        :show="error"
        @dismissed="error=false">
      <p>{{ error }}</p>
    </b-alert>
    <main>
      <h1>Tables</h1>

    </main>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'tables',
  components: {
  },
  data () {
    return {
      error: false,
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
    },
    teamOrder () {
      return this.$store.state.order
    }

  },
  methods: {
    saveTeamOrder () {
      let userId = localStorage.getItem('id')

      let payload = {
        order: this.teamOrder
      }

      axios.put(`/competition/user/${userId}/order`,
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
      this.$store.dispatch('getTeamOrder', id)
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

      this.addToOrder(draggedTeam, droppedTeam, this.teamOrder)
    },
    addToOrder (draggedTeam, droppedTeam, order) {
      console.log(order)
      let indexOfDragged = order.indexOf(draggedTeam)
      let indexOfDropped = order.indexOf(droppedTeam)

      order.splice(indexOfDragged, 1)
      order.splice(indexOfDropped, 0, draggedTeam)
      this.$store.dispatch('setTeamOrder', order)
    }
  },
  filters: {
    capitalize: function (name) {
      return name.charAt(0).toUpperCase() + name.slice(1)
    }
  },
  created: function () {
    let id = localStorage.getItem('id')
    this.$store.dispatch('getTeams')
    this.$store.dispatch('getTeamOrder', id)
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
