const fetch = require('node-fetch');
const mongoose = require('mongoose');
const uri = process.env.MONGO_URL;

const Match = require('../models/match.js');

mongoose.Promise = global.Promise;

mongoose.connect(uri, {
  useMongoClient: true
}).then(function(data) { console.log('connected to mongo' );
}).catch(function(error) { console.log(error) });

const competitionsUrl = 'http://api.football-data.org/v1/competitions/452/fixtures';

class MatchFetcher {

  parseApi(obj) {
    let object = obj.fixtures;

    object.forEach((item) => {

      let id = item._links.self.href.slice(-6);
      let halfTimeHomeGoals1 = null;
      let halfTimeAwayGoals1 = null;

      if (item.result.halfTime != undefined) {
        halfTimeHomeGoals1 = item.result.halfTime.goalsHomeTeam;
        halfTimeAwayGoals1 = item.result.halfTime.goalsAwayTeam;
      };

      let matchItem = {
        matchId: id,
        homeTeamName: item.homeTeamName,
        awayTeamName: item.awayTeamName,
        date: new Date(item.date).getTime(),
        matchday: item.matchday,
        homeGoals: item.result.goalsHomeTeam,
        awayGoals: item.result.goalsAwayTeam,
        halfTimeHomeGoals: halfTimeHomeGoals1,
        halfTimeAwayGoals: halfTimeAwayGoals1,
        status: item.status
      };

      let update = Match.findOne({matchId: id}).then(function(prevMatch) {
        if (prevMatch == null) {
          Match.create(matchItem).then(function(newMatch) {
            console.log('new match item created: ',newMatch);
          }).catch(function(error) {
            console.log('match item creation was not successful: ',error);
          });
        } else {
          Match.update({matchId:prevMatch.matchId}, matchItem).then(function(newItem) {
            console.log('updated existing match item: ',newItem);
          }).catch(function(error) {
            console.log('updating match item was not successful: ',error);
          });
        }
      }).catch(function(error) {
        console.log('error: ',error);
      });
    });

    // console.log(JSON.stringify({message: 'Competition results updated', timestamp: new Date, process_id: process.pid}));
    // process.exit(0);

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

const manager = new MatchFetcher;
ApiClient.fetchData(competitionsUrl)
  .then(matches => { manager.parseApi(matches) })
  .catch(error => { console.log('error', error) });
