const Match = require('../models/match.js');
const Validator = require('../services/validateHeaders.js');

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
}

module.exports = MatchList
