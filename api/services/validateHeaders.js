const jwt = require('jwt-simple');
const secret = process.env.JWT_SECRET;
const _ = require('lodash');

const User = require('../models/user.js');

const emailValidator = require('email-validator');
const passwordValidator = require('password-validator');
const schema = new passwordValidator();
const MIN = 8;
const MAX = 100

schema
  .is().min(MIN)
  .is().max(MAX)
  .has().uppercase()
  .has().lowercase()
  .has().digits()
  .has().not().spaces()
  .is().not().oneOf(['Passw0rd', 'Password123', 'Jelszo1', 'Jelsz0']);

class Validator {
  // validator only checks the presense and valid state of the token, but it does not use it's values
  static checkCustomHeaders(headers) {
    if ('my-custom-header' in headers) {
      try {
        jwt.decode(headers['my-custom-header'], secret, false)
        return true
      } catch (e) {
        return false
      }
    } else {
      return false
    }
  }

  static isValidTipInput(homeGoals, awayGoals) {
    return Number.isInteger(homeGoals) && Number.isInteger(awayGoals) && homeGoals >= 0 && awayGoals >= 0
  }

  static isValidRegistration(rawRegData) {

    if (!rawRegData.name.match('^[a-zA-Z0-9]{5,30}$')) {
      return {success: false, message: 'Username contains not supported characters.'}
    }

    if (!emailValidator.validate(rawRegData.email)) {
      return {success: false, message: 'Email address is invalid.'}
    }

    let passwordFails = schema.validate(rawRegData.password, { list: true });

    if (passwordFails.length > 0) {
      let mappedFails = passwordFails.map((fail) => {
        switch (fail) {
          case 'min': return `Password must be minimum ${MIN} characters long`; break;
          case 'max': return `Password must be at least ${MAX} characters long`; break;
          case 'uppercase': return `Password must contain at least one ${fail} character`; break;
          case 'lowercase': return `Password must contain at least one ${fail} character`; break;
          case 'digits': return `Password must contain at least one digit`; break;
          case 'spaces': return `Password must not contain any spaces`; break;
          case 'oneOf': return `Password must not contain ${fail}`; break;
        }
      })

      let fails = mappedFails.join(', ');
      console.log(fails);

      return {success: false, message: fails}
    }

    return {success: true}
  }
}

module.exports = Validator
