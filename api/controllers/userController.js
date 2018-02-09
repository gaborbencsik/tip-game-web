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
    
    let isValidRegistration = Validator.isValidRegistration({name: req.body.name, password: req.body.password, email: req.body.email})

    if (!isValidRegistration.success) {
      res.status(200).send({success: false, message: isValidRegistration.message})
      return
    }

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
        registration: userData.registration,
        favouriteTeam: userData.favourite_team
      }
      res.status(200).send({ user: user, success: true});
    }).catch(function(error) {
      console.log(error);
      next();
    });
  }

  setFavouriteTeam(req, res) {
    if (!Validator.checkCustomHeaders(req.headers)) {
      res.status(401).send({success: false, message: 'Not authorized.'});
      return
    }

    const user = User.findOne({_id:req.params.userId}).then(user => {

      if (user.favourite_team != undefined) {
        res.status(200).send({success: false, message: 'Favourite team can be set only once', user: user});
        return
      }

      User.findOneAndUpdate({_id: req.params.userId}, {favourite_team: req.body.favouriteTeam}, {upsert: true}
      ).then(user => {
        User.findOne({_id: req.params.userId}).then(user => {
          res.status(200).send({success: true, user: user});
        })
      });
    }).catch(error => {
      console.log('error', error);
      res.status(200).send({success: false, message: error});
    });
  }

  getCurrentScore(req, res) {
    if (!Validator.checkCustomHeaders(req.headers)) {
      res.status(401).send({success: false, message: 'Not authorized.'});
      return
    }

    User.findOne({_id: req.params.userId}).then(user => {
      let score = user.score;
      res.status(200).send({success: true, score: score})
    }).catch(error => {
      console.log(error);
      res.status(200).send({success: false, message: error});
    });
  }

  getAllUsers(req, res) {
    if (!Validator.checkCustomHeaders(req.headers)) {
      res.status(401).send({success: false, message: 'Not authorized.'});
      return
    }

    User.find({}).then(users => {
      let userList = users.map(user => {
        return {
          name: user.name,
          id: user._id,
          score: user.score,
          lastSeen: user.last_seen,
          favouriteTeam: user.favourite_team
        }
      })
      res.status(200).send({success: true, users: userList})
    }).catch(error => {
      console.log(error);
      res.status(200).send({success: false, message: error});
    });
  }
}

module.exports = UserController
