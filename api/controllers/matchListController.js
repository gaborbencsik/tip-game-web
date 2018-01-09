const Match = require('../models/match.js');
const Validator = require('../services/validateHeaders.js');
const Tip = require('../models/tip.js');
const _ = require('lodash');

class MatchList {

  getAll(req, res, next) {
    if (!Validator.checkCustomHeaders(req.headers)) {
      res.status(401).send({success: false, message: 'Not authorized.'});
      return
    }

    Match.find({}).then(function(matches) {
      res.status(200).send({success: true, data: matches});
    })
  }

  getTipsForMatches(req, res, next) {
    if (!Validator.checkCustomHeaders(req.headers)) {
      res.status(401).send({success: false, message: 'Not authorized.'});
      return
    }

    let matchList = Match.find({});
    let tipList = Tip.find({userId: req.params.userId});

    Promise.all([matchList, tipList]).then(values => {
      let matches = values[0];
      let tips = _.keyBy(values[1], 'matchId');
      let totalScore = 0;

      let list = matches.map(match => {
        let tipMatchId = tips[match.matchId];
        let homeGoalsTip = tipMatchId === undefined ? null : tipMatchId.homeGoals;
        let awayGoalsTip = tipMatchId === undefined ? null : tipMatchId.awayGoals;
        
        let score = Utils.countScore(match.homeGoals, match.awayGoals, homeGoalsTip , awayGoalsTip);
        totalScore += score;

        return {
          matchId: match.matchId,
          homeTeamName: match.homeTeamName,
          awayTeamName: match.awayTeamName,
          date: match.date,
          matchday: match.matchday,
          homeGoals: match.homeGoals,
          awayGoals: match.awayGoals,
          homeGoalsTip: tipMatchId === undefined ? '' : tipMatchId.homeGoals,
          awayGoalsTip: tipMatchId === undefined ? '' : tipMatchId.awayGoals,
          lastModified: tipMatchId === undefined ? '' : tipMatchId.lastModified,
          score: score
        }
      });
      res.send({data: list, totalScore: totalScore});
    }).catch(function(error) {
      console.log('error',error);
      res.send(error);
    });
  }
}

module.exports = MatchList

class Utils {
  static countScore(homeGoals, awayGoals, homeGoalsTip, awayGoalsTip) {
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
