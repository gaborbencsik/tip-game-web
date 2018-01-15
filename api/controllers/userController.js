const SALT = 'tip-game'
const Cryptr = require('cryptr');
const cryptr = new Cryptr(SALT);

const jwt = require('jwt-simple');
const secret = process.env.JWT_SECRET;

const User = require('../models/user.js');
const Validator = require('../services/validateHeaders.js');

class UserController {

  login(req, res, next) {

    const user = User.findOne({name:req.body.name}).then(function(user, next) {
      if (user == null) {
        res.status(200).send({success: false, message: 'User does not exist'});
      } else {
        let password = cryptr.decrypt(user.password);

        if (password == req.body.password) {
          let token = jwt.encode({ id: user._id, name: user.name}, SALT);
          res.status(200).send({ id: user._id, success: true,  token: token, name: user.name });
        } else {
          res.status(200).send({success: false, message: 'Invalid password'})
        }
      }
    })
  }

  register(req, res, next) {

    let regData = {
      name: req.body.name,
      password: cryptr.encrypt(req.body.password),
      email: req.body.email
    }

    User.findOne({name: req.body.name}).then(function(user, next) {
      if (user == null) {
        User.create(regData).then(function(newUser) {
          res.status(200).send({success: true, id: newUser._id})
        }).catch(function(error) {
          console.log(error);
          res.status(200).send({success: false, message: 'Email address is already in use. Please choose an other one'});
        });
      } else {
        res.status(200).send({success: false, message: 'Username already exists. Please choose an other one'});
      }
    }).catch(function(error) {
      console.log(error);
      next();
    });
  }

  getProfile(req, res) {
    if (!Validator.checkCustomHeaders(req.headers)) {
      res.status(401).send({success: false, message: 'Not authorized.'});
      return
    }

    User.findOne({_id: req.params.userId}).then(function(userData) {
      let user = {
        name: userData.name,
        email: userData.email,
        id: userData._id,
        score: userData.score,
        lastSeen: userData.last_seen,
        registration: userData.registration
      }
      res.status(200).send({ user: user, success: true});
    }).catch(function(error) {
      console.log(error);
      next();
    });
  }
}

module.exports = UserController
