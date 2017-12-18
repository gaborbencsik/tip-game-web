const User = require('../models/user.js');

const jwt = require('jwt-simple');
const secret = process.env.JWT_SECRET;

// validator only checks the presense and valid state of the token, but it does not use it's values

class Validator {
  static checkCustomHeaders(headers) {
    if ('my-custom-header' in headers) {
      try {
        jwt.decode(headers['my-custom-header'], secret, false)
        return true
      } catch (e) {
        console.log(e);
        return false
      }
    }
  }
}

module.exports = Validator
