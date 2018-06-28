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

const url = 'http://api.football-data.org/v1/competitions/467/fixtures';

class ScoreCalculator {

  async calculate() {
    let users = await User.find({});
    let matchList = await Match.find({});

    await this.calculateScoreFor(users, matchList);

    console.log(JSON.stringify({
      message: 'Score calculation finished',
      timestamp: new Date,
      process_id: process.pid
    }));

    process.exit(0);
  }

  async calculateScoreFor(users, matches){
    for (let user of users) {
      let tipListOfUser = await Tip.find({userId: user._id});
      let tips = _.keyBy(tipListOfUser, 'matchId');
      let totalScore = 0;

      for (let match of matches) {
        let existingTip = tips[match.matchId];

        if (existingTip === undefined) {
          totalScore += 0
        } else {
          let isDoubleScore = this.isDoubleScore(match.homeTeamName, match.awayTeamName, user.favourite_team);
          let score = this.countScore(match.homeGoals, match.awayGoals, existingTip.homeGoals, existingTip.awayGoals, isDoubleScore)
          await this.setTipScore(existingTip.userId, existingTip.matchId, score)
          totalScore += score
        }
      }

      await this.setTotalScore(user._id, totalScore);
    }
  }

  async setTipScore(userId, matchId, score) {

    let match = await Match.findOne({matchId: matchId});

    if (match.homeGoals != null || match.awayGoals != null) {
      try {
        let tip = await Tip.findOne({userId: userId, matchId: matchId});
        await Tip.findOneAndUpdate({_id: tip._id}, {score: score}, {upsert: true})
        console.log('tip score is updated', {matchId: tip.matchId, userId: tip.userId, score: tip.score});
      } catch (error) {
        console.log('error',error);
      }
    }
  }

  async setTotalScore(userId, score) {
    let user = await User.find({_id: userId});

    let oldScore = user[0].score;
    if (oldScore <= score) {
      let entry = await User.findOneAndUpdate({_id: userId}, { $set: { score: score }}, {upsert: true});
      console.log({message: 'Score update was successful', name: entry.name, id: entry._id});
    } else {
      console.log({id: user[0]._id, name: user[0].name, error: 'The old score is higher then the new score', old: oldScore, new: score});
    }
  }

  isDoubleScore(homeTeamName, awayTeamName, favouriteTeam) {
    if (homeTeamName === favouriteTeam || awayTeamName === favouriteTeam) {
      return true
    } else {
      return false
    }
  }

  countScore(homeGoals, awayGoals, homeGoalsTip, awayGoalsTip, isDoubleScore) {
    let score = 0;
    if (homeGoals == null || awayGoals == null) {
      score = 0
    } else if (homeGoals == homeGoalsTip && awayGoals == awayGoalsTip) {
      score = 3
    } else if (homeGoals > awayGoals && homeGoalsTip > awayGoalsTip ||
      homeGoals / awayGoals == 1 && homeGoalsTip / awayGoalsTip == 1 ||
      homeGoals / awayGoals == 1 && homeGoalsTip == 0 && awayGoalsTip == 0 ||
      homeGoals == 0 && awayGoals == 0 && homeGoalsTip / awayGoalsTip == 1 ||
      homeGoals == 0 && awayGoals == 0 && homeGoalsTip == 0 && awayGoalsTip == 0 ||
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
