const Match = require('../models/match.js');
const Validator = require('../services/validateHeaders.js');
const Tip = require('../models/tip.js');
const Team = require('../models/team.js');
const CompetitionOrder = require('../models/competitionOrder.js');
const fetch = require('node-fetch');

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

  getGroups(req, res, next) {
    if (!Validator.checkCustomHeaders(req.headers)) {
      res.status(401).send({success: false, message: 'Not authorized.'});
      return
    }

    fetch('http://api.football-data.org/v1/competitions/467/leagueTable', {
      method: 'GET',
      headers: { 'X-Auth-Token': 'e61a9ca95d4540aeb951e2c2ba44359d' }
    }).then(response => {
      return response.json();
    }).then(response => {
      console.log(response);
      res.status(200).send({success: true, data: response.standings});
    }).catch(error => {
      console.log(error);
      return Promise.reject();
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

      let list = matches.map(match => {
        let tipMatchId = tips[match.matchId];
        let homeGoalsTip = tipMatchId === undefined ? null : tipMatchId.homeGoals;
        let awayGoalsTip = tipMatchId === undefined ? null : tipMatchId.awayGoals;
        let score = tipMatchId === undefined ? null : tipMatchId.score;

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
      res.send({ success: true, data: list});
    }).catch(function(error) {
      console.log('error',error);
      res.send({success: false, message: error});
    });
  }

  getTeams(req, res) {
    if (!Validator.checkCustomHeaders(req.headers)) {
      res.status(401).send({success: false, message: 'Not authorized.'});
      return
    }

    Team.find({}).then(teams => {
      res.send({success: true, data: teams})
    }).catch(error => {
      console.log('error', error);
      res.send({success: false, message: error});
    });
  }

  getTeamOrder(req, res) {
    if (!Validator.checkCustomHeaders(req.headers)) {
      res.status(401).send({success: false, message: 'Not authorized.'});
      return
    }

    CompetitionOrder.findOne({userId: req.params.userId, competition: "Bundesliga"}).then(order => {
      res.status(200).send({success: true, data: order});
    }).catch(error => {
      console.log('error', error);
      res.status(200).send({success: false, message: error});
    });
  }

  saveOrder(req, res) {
    if (!Validator.checkCustomHeaders(req.headers)) {
      res.status(401).send({success: false, message: 'Not authorized.'});
      return
    }

    CompetitionOrder.findOneAndUpdate(
      { userId: req.params.userId,  competition: "Bundesliga"},
      { order: req.body.order },
      { upsert: true }
    ).then(order => {
        CompetitionOrder.findOne({userId: req.params.userId, competition: "Bundesliga"}).then(order => {
          res.status(200).send({success: true, order: order});
        })
    }).catch(error => {
      console.log('error', error);
      res.status(200).send({success: false, message: error});
    });
  }
}

module.exports = MatchList
