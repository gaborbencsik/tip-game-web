const SALT = 'tip-game'
const Cryptr = require('cryptr');
const cryptr = new Cryptr(SALT);

const jwt = require('jwt-simple');
const secret = 'tip_game_club';

const SALT_ROUNDS = 10;

const User = require('../models/user.js');

class AuthController {

  login(req, res, next) {

    const user = User.findOne({name:req.body.name}).then(function(user, next) {
      if (user == null) {
        res.status(200).send({success: false, message: 'User does not exist'});
      } else {
        let password = cryptr.decrypt(user.password);

        if (password == req.body.password) {
          let token = jwt.encode({ id: user._id, name: user.name}, SALT);
          res.status(200).send({ id: user._id, success: true,  token: token });
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
}

module.exports = AuthController
