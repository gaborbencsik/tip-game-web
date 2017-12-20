const Match = require('../models/match.js');
const Tip = require('../models/tip.js');
const Validator = require('../services/validateHeaders.js');

class TipsController {

  save(req, res) {

    let tip = {
      userId: req.params.userId,
      matchId: req.params.matchId,
      homeGoals: req.body.homeGoals,
      awayGoals: req.body.awayGoals,
      lastModified: new Date().toISOString()
    }

    Tip.findOneAndUpdate({userId: req.params.userId, matchId: req.params.matchId}, tip, {upsert: true}).then(function(tip) {
      console.log('tip',tip);
      res.send(tip);
    }).catch(function(error) {
      console.log('error',error);
      res.send(error);
    })
  }

  get(req, res) {
    Match.find({}).then(function(matches) {
      Tip.find({userId: req.params.userId}).then(function(tips) {
        let tipList = [];
        matches.forEach(match => {
          tips.forEach(tip => {
            tipList.push({
              matchId: match.matchId,
              homeTeamName: match.homeTeamName,
              awayTeamName: match.awayTeamName,
              date: match.date,
              matchday: match.matchday,
              homeGoals: match.matchId === tip.matchId ? tip.homeGoals : '',
              awayGoals: match.matchId === tip.matchId ? tip.awayGoals : '',
              lastModified: match.matchId === tip.matchId ? tip.lastModified : ''
            })
          })
        })
        res.send(tipList);
      }).catch(function(error) {
        console.log('error',error);
        res.send(error);
      })
    }).catch(function(error) {
      console.log('error',error);
      res.send(error);
    });
  }
}

module.exports = TipsController
