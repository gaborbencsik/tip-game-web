const fetch = require('node-fetch');
const mongoose = require('mongoose');
const uri = process.env.MONGO_URL;

const Team = require('../models/team.js');

mongoose.Promise = global.Promise;

mongoose.connect(uri, {
  useMongoClient: true
}).then(function(data) { console.log('connected to mongo' );
}).catch(function(error) { console.log(error) });

const worldCupData = 'http://api.football-data.org/v1/competitions/467/leagueTable';

class WorldCupFetcher {

  async parseApi(league) {

    let standings = league.standings

    let counter = 0;

    Object.entries(standings).forEach( async ([key, teamData]) => {

      teamData.forEach( async teamItem => {

        // try {
          counter++;
          console.log('ITT');
          console.log(counter);
          let team = await Team.findOneAndUpdate({ team: teamItem.team }, teamItem, { upsert: true });
          console.log('OTT');
          console.log(team);
          // let updated = await Team.find({team: teamItem.team,});
          // console.log(updated);
        // } catch (error) {
        //   console.log('error',error);
        // }

        console.log('OTT');
      })
    });

    console.log('VEGE');
    process.exit(0);
  }

  fetchTeams(teams) {
    teams.forEach(team => {
      console.log(team);
    })
  }

  fetchMatches(groups) {
    console.log(groups);
    Object.entries(groups).forEach(
        ([key, value]) => console.log(key, value.matches)
    );
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

const manager = new WorldCupFetcher;
ApiClient.fetchData(worldCupData)
  .then(data => { manager.parseApi(data) })
  .then(info => { console.log('vége') })
  .catch(error => { console.log('error', error) });
