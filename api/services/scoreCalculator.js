const fetch = require('node-fetch');
const mongoose = require('mongoose');
const uri = process.env.MONGO_URL;

const User = require('../models/user.js');

mongoose.Promise = global.Promise;

mongoose.connect(uri, {
  useMongoClient: true
}).then(function(data) {
}).catch(function(error) {
  console.log(error);
});

const url = 'http://api.football-data.org/v1/competitions/452/fixtures';

class ScoreCalculator {

  calculate() {

  }

  getUsers() {
    User.find({}).then(users => {
      console.log(users);
    });
  }

  countScore(homeGoals, awayGoals, homeGoalsTip, awayGoalsTip) {
    let score = 0;
    if (homeGoals == null || awayGoals == null) {
      score = 0
    } else if (homeGoals == homeGoalsTip && awayGoals == awayGoalsTip) {
      score = 3
    } else if (homeGoals > awayGoals && homeGoalsTip > awayGoalsTip ||
      homeGoals / awayGoals == 1 && homeGoalsTip / awayGoalsTip == 1 ||
      homeGoals < awayGoals && homeGoalsTip < awayGoalsTip) {
      score = 1
    } else {
      score = 0
    }
    return score
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

const calculator = new ScoreCalculator;
calculator.getUsers();
// ApiClient.fetchData(url)
//   .then((data) => { manager.parseApi(data) })
//   .catch(error => { console.log(error); });
