const Match = require('../models/match.js');
const Validator = require('../services/validateHeaders.js');

class MatchList {

  getAll(req, res, next) {
    console.log(typeof(req.headers))

    if (Validator.checkCustomHeaders(req.headers)) {
      Match.find({}).then(function(matches) {
        res.status(200).send({success: true, data: matches});
      })
    } else {
      res.status(200).send({success: false, message: 'Not authorized.'});
    }
  }
}

module.exports = MatchList
