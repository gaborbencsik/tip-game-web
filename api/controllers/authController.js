const wee_db = require('wee-db');
const users_db = wee_db('users.json');
const passwords_db = wee_db('passwords.json');

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const users_adapter = new FileSync('users.json');
const users_db_getter = low(users_adapter);

const SALT = 'tip-game'
const Cryptr = require('cryptr');
const cryptr = new Cryptr(SALT);

const jwt = require('jwt-simple');
const secret = 'tip_game_club';

const SALT_ROUNDS = 10;

const db = require('../services/db.js');

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
    // const user = users_db.find('users', { username: req.body.username }).documents[0];
    console.log(req.body);

    // if (user == undefined) {
    //   res.json({ success: false, message: 'User does not exist' });
    // } else {
    //
    //   let plainTextPassword = req.body.password
    //   console.log();
      // let passwordHash = passwords_db.find('passwords', {id: user.id}).documents[0].password;

      // bcrypt.compare(plainTextPassword, passwordHash, function(err, response) {
      //   if (response) {
      //     let token = jwt.encode({ id: user.id, name: user.name}, secret);
      //     res.json({ id: user.id, success: true,  token: token });
      //
      //   } else {
      //     res.json({ success: false, message: 'Invalid password' });
      //   }
      //   console.log('response:',response);
      // });
    // }
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
          res.status(200).send({success: true, data: newUser})
        }).catch(function(error) {
          console.log(error);
          res.status(409).send({success: false, message: 'Email address is already in use. Please choose an other one'});
        });
      } else {
        res.status(403).send({success: false, message: 'Username already exists. Please choose an other one'});
      }
    }).catch(function(error) {
      console.log(error);
      next();
    });
  }
}

module.exports = AuthController
