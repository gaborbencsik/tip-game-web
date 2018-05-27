const fetch = require('node-fetch');
const mongoose = require('mongoose');
const uri = process.env.MONGO_URL;

const Match = require('../models/match.js');
const Team = require('../models/team.js');

mongoose.Promise = global.Promise;

mongoose.connect(uri, {
  useMongoClient: true
}).then(function(data) {
}).catch(function(error) {
  console.log(error);
});

// const url = 'http://api.football-data.org/v1/competitions/452/teams';
const url = 'http://api.football-data.org/v1/competitions/467/teams';

class TeamFetcher {

  parseTeamList(teamListObj) {

    let teamList = teamListObj.teams;

    teamList.forEach(team => {

      let teamData = {
        code: team.code,
        name: team.name,
        shortName: team.shortName,
        logoUrl: team.crestUrl,
        links: team._links
      }

      Team.findOneAndUpdate({name: team.name}, teamData, {upsert: true}
      ).then(function() {
        Team.find({name: team.name,}).then(team => {
          console.log(team);
        })
      }).catch(function(error) {
        console.log('error',error);
      });
    });
  }
}

let ApiClient = {
  fetchData: function(url) {
    return fetch(url, {
      method: 'GET',
      headers: { 'X-Auth-Token': 'e61a9ca95d4540aeb951e2c2ba44359d' }
    }).then(response => {
      return response.json();
    }).catch(error => {
      console.log(error);
      return Promise.reject();
    })
  }
}

const fetcher = new TeamFetcher;
ApiClient.fetchData(url)
  .then((data) => { fetcher.parseTeamList(data) })
  .then(() => { console.log('finished') })
  .catch(error => { console.log(error); });
