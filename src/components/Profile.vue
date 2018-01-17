<template class="container-fluid">
  <div v-if="authenticated" class="profile">
    <header>
      <img v-bind:src="getAvatarUrl" v-bind:title="username">
      <h2>{{ username | capitalize }}</h2>
    </header>
    <main>
      <div class="row">
        <div class="col-xs-4 col-xs-offset-2">
          Username
        </div>
        <div class="col-xs-4">
          {{ getUser.name }}
        </div>
      </div>
      <table class='table table-responsive-sm'>
        <tbody>
          <tr>
            <td>Username</td>
            <td>{{ getUser.name }}</td>
          </tr>
          <tr>
            <td>Email</td>
            <td>{{ getUser.email }}</td>
          </tr>
          <tr>
            <td>Score</td>
            <td>{{ getUser.score }}</td>
          </tr>

        </tbody>
      </table>
      <table class='table table-responsive-sm'>
        <tbody>
          <tr>
            <td>Favourite Team</td>
            <td class="input">
              <input v-model="favouriteTeam">
            </td>
          </tr>
        </tbody>
      </table>
    </main>

  </div>
</template>

<script>
export default {
  name: 'profile',
  data () {
    return {
      favouriteTeam: ''
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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

header {
  display: flex;
  align-items: center;
}

h2 {
  margin-left: 1rem;
}

</style>
