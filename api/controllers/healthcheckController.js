const Validator = require('../services/validateHeaders.js');

class HealthcheckController {

  get(req, res) {
    if (!Validator.checkCustomHeaders(req.headers)) {
      res.status(401).send({success: false, message: 'Not authorized.'});
      return
    }
    res.send({success: true})
  }

}

module.exports = HealthcheckController
