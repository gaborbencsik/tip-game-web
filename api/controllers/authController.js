const wee_db = require('wee-db');
const users_db = wee_db('users.json');
const passwords_db = wee_db('passwords.json');

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const users_adapter = new FileSync('users.json');
const users_db_getter = low(users_adapter);

const bcrypt = require('bcrypt');

const jwt = require('jwt-simple');
const secret = 'tip_game_club';

const SALT_ROUNDS = 10;

const db = require('../services/db.js');

class AuthController {

  login(req, res) {

    const user = users_db.find('users', { username: req.body.username }).documents[0];
    console.log('user',user);

    if (user == undefined) {
      res.json({ success: false, message: 'User does not exist' });
    } else {

      let plainTextPassword = req.body.password
      let passwordHash = passwords_db.find('passwords', {id: user.id}).documents[0].password;

      bcrypt.compare(plainTextPassword, passwordHash, function(err, response) {
        if (response) {
          let token = jwt.encode({ id: user.id, name: user.name}, secret);
          res.json({ id: user.id, success: true,  token: token });

        } else {
          res.json({ success: false, message: 'Invalid password' });
        }
        console.log('response:',response);
      });
    }
  }

  register(req, res) {
    let userData = users_db.find('users', {username: req.body.username});
    let plainTextPassword = req.body.password;

    if (userData.count != 0) {
      res.send({error: 'Username already exists.'})
    } else {
      db.registerUser(req.body.username, req.body.email).then((userId) => {
        db.savePasswordFor(userId, plainTextPassword);
      }).catch(error => {
        console.log(error);
      });
      res.send(req.body);
    }
  }
}

module.exports = AuthController
