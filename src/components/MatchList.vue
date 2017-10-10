<template>
  <div class="matchList container-fluid">
    <h1>MatchList</h1>
    <main>
      <table class='table table-responsive'>
        <thead>

          <tr>
            <th>Home</th>
            <th>Away</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <!-- each match in catalog -->
            <td>Videoton FC</td>
            <td>Ferencváros</td>
            <td>1970.01.01</td>
          </tr>
        </tbody>

      </table>

    </main>
  </div>
</template>

<script>
export default {
  name: 'matchList',
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
