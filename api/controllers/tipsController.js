const Match = require('../models/match.js');
const Tip = require('../models/tip.js');
const Validator = require('../services/validateHeaders.js');
const _ = require('lodash');

class TipsController {

  save(req, res) {
    console.log(req.body);
    console.log(req.params);

    // check match Date

    let matchData = Match.find({matchId: req.params.matchId}).then(match => {
      console.log('match from query params',match);
    });

    let tip = {
      userId: req.params.userId,
      matchId: req.params.matchId,
      homeGoals: req.body.homeGoals,
      awayGoals: req.body.awayGoals,
      lastModified: new Date().toISOString()
    }

    Tip.findOneAndUpdate({userId: req.params.userId, matchId: req.params.matchId}, tip, {upsert: true}
    ).then(function() {
      Tip.find({userId: req.params.userId, matchId: req.params.matchId}).then(tip => {
        res.send(tip);
      })
    }).catch(function(error) {
      console.log('error',error);
      res.send(error);
    })
  }

  get(req, res) {
    let matchList = Match.find({});
    let tipList = Tip.find({userId: req.params.userId});

    Promise.all([matchList, tipList]).then(values => {
      let matches = values[0];
      let tips = _.keyBy(values[1], 'matchId');

      let list = [];

      matches.forEach(match => {
        let tipMatchId = tips[match.matchId];
        let currentDate = new Date(match.date).getTime();

        if (currentDate > Date.now()) {
          list.push({
            matchId: match.matchId,
            homeTeamName: match.homeTeamName,
            awayTeamName: match.awayTeamName,
            date: match.date,
            matchday: match.matchday,
            homeGoals: tipMatchId === undefined ? '' : tipMatchId.homeGoals,
            awayGoals: tipMatchId === undefined ? '' : tipMatchId.awayGoals,
            lastModified: tipMatchId === undefined ? '' : tipMatchId.lastModified
          });
        }
      });

      res.send(list);
    }).catch(function(error) {
      console.log('error',error);
      res.send(error);
    });
  }
}

module.exports = TipsController
