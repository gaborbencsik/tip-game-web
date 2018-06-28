const fetch = require('node-fetch');
const mongoose = require('mongoose');
const uri = process.env.MONGO_URL;

const Match = require('../models/match.js');

mongoose.Promise = global.Promise;

mongoose.connect(uri, {
  useMongoClient: true
}).then(function(data) { console.log('connected to mongo' );
}).catch(function(error) { console.log(error) });

// const competitionsUrl = 'http://api.football-data.org/v1/competitions/452/fixtures';
const competitionsUrl = 'http://api.football-data.org/v1/competitions/467/fixtures';

class MatchFetcher {

  async parseApi(obj) {
    let matches = obj.fixtures;

    for (let match of matches) {

      let id = match._links.self.href.slice(-6);
      let halfTimeHomeGoals1 = null;
      let halfTimeAwayGoals1 = null;

      if (match.result.halfTime != undefined) {
        halfTimeHomeGoals1 = match.result.halfTime.goalsHomeTeam;
        halfTimeAwayGoals1 = match.result.halfTime.goalsAwayTeam;
      };

      let matchItem = {
        matchId: id,
        homeTeamName: match.homeTeamName,
        awayTeamName: match.awayTeamName,
        date: new Date(match.date).getTime(),
        matchday: match.matchday,
        homeGoals: match.result.goalsHomeTeam,
        awayGoals: match.result.goalsAwayTeam,
        halfTimeHomeGoals: halfTimeHomeGoals1,
        halfTimeAwayGoals: halfTimeAwayGoals1,
        status: match.status
      };

      let matchItemFromDB = await Match.findOne({ matchId: id });

      if (matchItemFromDB == null) {
        try {
          let newMatchItem = await Match.create(matchItem);
          console.log('new match item created: ',newMatchItem);
        } catch (error) {
          console.log('match item creation was not successful: ',error);
        }
      } else {
        try {
          let updatedMatchItem = await Match.update({ matchId: matchItem.matchId }, matchItem);
          console.log('updated existing match item: ',updatedMatchItem);
        } catch (error) {
          console.log('updating match item was not successful: ',error);
        }
      }
    }

    console.log(JSON.stringify({
      message: 'Match update finished',
      timestamp: new Date,
      process_id: process.pid
    }));

    process.exit(0);

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
