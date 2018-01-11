const fetch = require('node-fetch');
const mongoose = require('mongoose');
const uri = process.env.MONGO_URL;

const User = require('../models/user.js');
const Match = require('../models/match.js');
const Tip = require('../models/tip.js');
const _ = require('lodash');

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
    User.find({}).then(users => {
      users.forEach(user => {

        let matchList = Match.find({});
        let tipList = Tip.find({userId: user._id});

        Promise.all([matchList, tipList]).then(values => {
          let matches = values[0];
          let tips = _.keyBy(values[1], 'matchId');
          let totalScore = 0;

          matches.forEach(match => {
            let tipMatchId = tips[match.matchId];

            if (tipMatchId === undefined) {
              totalScore += 0
            } else {
              let score = this.countScore(match.homeGoals, match.awayGoals, tipMatchId.homeGoals, tipMatchId.awayGoals)
              totalScore += score
            }
          });
          this.setScore(user._id, totalScore);
        });
      });
    }).catch(error => {
      console.log(error);
    });
  }

  setScore(userId, score) {
    User.findOneAndUpdate({_id: userId}, { $set: { score: score }}, {upsert: true}).then(function(user) {
      let oldScore = user.score;
      User.find({_id: user._id}).then(function(user) {
        let newScore = user[0].score
        if (oldScore > newScore) {
          console.log({error: 'The old score is higher then the new score'});
        } else {
          console.log({message: 'Score update is finished', name: user[0].name, id: user[0]._id});
        }
      })
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

const calculator = new ScoreCalculator;
calculator.calculate();
