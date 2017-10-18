module.exports = {
  getMatches () {
    return fetch('http://localhost:4509/match-list', {
      method: 'GET'
    }).then(response => {
      console.log(response)
    }).catch(error => {
      console.log(error)
    })
  }
}
