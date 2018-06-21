const fetch = require('node-fetch');
const mongoose = require('mongoose');
// const uri = process.env.MONGO_URL;
const uri = 'mongodb://localhost:27017/tip-game';

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

const url = 'http://api.football-data.org/v1/competitions/467/fixtures';

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
            let existingTip = tips[match.matchId];

            if (existingTip === undefined) {
              totalScore += 0
            } else {
              let isDoubleScore = this.isDoubleScore(match.homeTeamName, match.awayTeamName, user.favourite_team);
              let score = this.countScore(match.homeGoals, match.awayGoals, existingTip.homeGoals, existingTip.awayGoals, isDoubleScore)
              this.setTipScore(existingTip.userId, existingTip.matchId, score)
              totalScore += score
            }
          });
          this.setTotalScore(user._id, totalScore);
        });
      });
    }).catch(error => {
      console.log(error);
    });
  }

  isDoubleScore(homeTeamName, awayTeamName, favouriteTeam) {
    if (homeTeamName === favouriteTeam || awayTeamName === favouriteTeam) {
      return true
    } else {
      return false
    }
  }

  setTipScore(userId, matchId, score) {

    let match = Match.findOne({matchId: matchId}).then(match => {
      if (match.homeGoals != null || match.awayGoals != null) {
        Tip.findOne({userId: userId, matchId: matchId}).then(tip => {
          Tip.findOneAndUpdate({userId: userId, matchId: matchId}, {score: score}, {upsert: true}
          ).then(tip => {
            console.log('tip score is updated', {matchId: tip.matchId, userId: tip.userId, score: tip.score});
          }).catch(function(error) {
            console.log('error',error);
          });
        })
      }
    });
  }

  setTotalScore(userId, score) {

    User.find({_id: userId}).then(user => {
      let oldScore = user[0].score;
      if (oldScore <= score) {
        User.findOneAndUpdate({_id: userId}, { $set: { score: score }}, {upsert: true}).then(user => {
          console.log({message: 'Score update was successful', name: user.name, id: user._id});
        }).catch(error => {
          console.log(error);
        });
      } else {
        console.log({id: user[0]._id, name: user[0].name, error: 'The old score is higher then the new score', old: oldScore, new: score});
      }
    });
  }

  countScore(homeGoals, awayGoals, homeGoalsTip, awayGoalsTip, isDoubleScore) {
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
    return isDoubleScore ? score * 2 : score
  }
}

const calculator = new ScoreCalculator;
calculator.calculate();
