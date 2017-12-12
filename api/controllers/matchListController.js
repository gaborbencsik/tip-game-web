const Match = require('../models/match.js');

class MatchList {

  getAll(req, res, next) {
    Match.find({}).then(function(matches) {
    res.send(matches);
  })
  }
}

module.exports = MatchList
