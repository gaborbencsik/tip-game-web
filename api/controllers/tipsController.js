const Match = require('../models/match.js');
const Tip = require('../models/tip.js');
const Validator = require('../services/validateHeaders.js');
const _ = require('lodash');

class TipsController {

  save(req, res) {
    if (!Validator.checkCustomHeaders(req.headers)) {
      res.status(401).send({success: false, message: 'Not authorized.'});
      return
    }

    if (!Validator.isValidTipInput(req.body.homeGoals, req.body.awayGoals)) {
      res.status(200).send({success: false, message: 'The submitted tip is not a number.'});
      return
    }

    if (req.body.homeGoals < 0 || req.body.awayGoals < 0) {
      res.status(200).send({success: false, message: 'Goals can not be negative numbers'})
      return
    }

    let matchData = Match.findOne({matchId: req.params.matchId});

    Promise.all([matchData]).then(values => {
      let date = new Date(values[0].date).getTime();
      let currentDate = Date.now();
      let timeDifference = date - currentDate;

      // list limiter
      if (timeDifference < 0) {
        res.status(200).send({success: false, message: 'You can not submit this tip, because the event is already started.'});
        return
      }

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
          res.status(200).send(tip);
        })
      }).catch(function(error) {
        console.log('error',error);
        res.send(error);
      });
    });
  }

  get(req, res) {
    if (!Validator.checkCustomHeaders(req.headers)) {
      res.status(401).send({success: false, message: 'Not authorized.'});
      return
    }

    let matchList = Match.find({});
    let tipList = Tip.find({userId: req.params.userId});

    Promise.all([matchList, tipList]).then(values => {
      let matches = values[0];
      let tips = _.keyBy(values[1], 'matchId');

      let list = [];

      matches.forEach(match => {
        let tipMatchId = tips[match.matchId];
        let currentDate = new Date(match.date).getTime();

        // list limiter
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

      res.status(200).send(list);
    }).catch(function(error) {
      console.log('error',error);
      res.send(error);
    });
  }
}

module.exports = TipsController
