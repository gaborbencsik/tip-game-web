const wee_db = require('wee-db');
const users_db = wee_db('users.json');
const passwords_db = wee_db('passwords.json');

const uuid = require('uuid/v1');
const ID_NAMESPACE = 'tips';

// const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;

class DB {
  constructor() {
  }

  static registerUser(username, email) {
    let userId = uuid();
    return new Promise(
      function(resolve, reject) {
        users_db.insert('users', {
          id: userId,
          username: username,
          email: email,
          admin: false,
          registration: new Date().getTime(),
          last_seen: new Date().getTime()}
        );
        resolve(userId);
      }
    )
  }

  static savePasswordFor(userId, plainTextPassword) {
    return new Promise(
      function(resolve, reject) {
        // bcrypt.hash(plainTextPassword, SALT_ROUNDS, function(err, hash) {
        //   console.log(hash);
        //   if(err) {
        //     console.log(err);
        //   }
        //   passwords_db.insert('passwords', {
        //     id: userId,
        //     password: hash}
        //   );
        // });
        resolve();
      }
    )
  }
}

module.exports = DB
