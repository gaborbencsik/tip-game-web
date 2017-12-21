const Match = require('../models/match.js');
const Tip = require('../models/tip.js');
const Validator = require('../services/validateHeaders.js');
const _ = require('lodash');

class TipsController {

  save(req, res) {

    console.log('body', req.body);

    let tip = {
      userId: req.params.userId,
      matchId: req.params.matchId,
      homeGoals: req.body.homeGoals,
      awayGoals: req.body.awayGoals,
      lastModified: new Date().toISOString()
    }

    console.log('tip1', tip);

    Tip.findOneAndUpdate({userId: req.params.userId, matchId: req.params.matchId}, tip, {upsert: true}).then(function(tip) {
      console.log('tip2',tip);
      res.send(tip);
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

      let list = matches.map(match => {
        let tipMatchId = tips[match.matchId];
        if (tipMatchId === undefined) {
          return {
            matchId: match.matchId,
            homeTeamName: match.homeTeamName,
            awayTeamName: match.awayTeamName,
            date: match.date,
            matchday: match.matchday,
            homeGoals: '',
            awayGoals: '',
            lastModified: ''
          }
        } else {
          return{
            matchId: match.matchId,
            homeTeamName: match.homeTeamName,
            awayTeamName: match.awayTeamName,
            date: match.date,
            matchday: match.matchday,
            homeGoals: tipMatchId.homeGoals,
            awayGoals: tipMatchId.awayGoals,
            lastModified: tipMatchId.lastModified
          }
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
