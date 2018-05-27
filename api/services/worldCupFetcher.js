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

  parseApi(league) {

    let standings = league.standings

    Object.entries(standings).forEach(([key, teamData]) => {
      teamData.forEach(teamItem => {
        // console.log(teamItem);

        Team.findOneAndUpdate({team: teamItem.team}, teamItem, {upsert: true}
        ).then(function() {
          Team.find({team: teamItem.team,}).then(team => {
            console.log(team);
          })
        }).then(()=> {
          console.log(`${teamItem.team} is updated`);
        }).catch(function(error) {
          console.log('error',error);
        });
      })
    });

    // console.log(league.standings);

    // this.fetchTeams(data.teams)
    // this.fetchMatches(data.groups)

    // let update = Match.findOne({matchId: id}).then(function(prevMatch) {
    //   if (prevMatch == null) {
    //     Match.create(matchItem).then(function(newMatch) {
    //       console.log('new match item created: ',newMatch);
    //     }).catch(function(error) {
    //       console.log('match item creation was not successful: ',error);
    //     });
    //   } else {
    //     Match.update({matchId:prevMatch.matchId}, matchItem).then(function(newItem) {
    //       console.log('updated existing match item: ',newItem);
    //     }).catch(function(error) {
    //       console.log('updating match item was not successful: ',error);
    //     });
    //   }
    // }).catch(function(error) {
    //   console.log('error: ',error);
    // });
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
