const fetch = require('node-fetch');
const mongoose = require('mongoose');
const uri = process.env.MONGO_URL;

const User = require('../models/user.js');
const Match = require('../models/match.js');
const Tip = require('../models/tip.js');
const _ = require('lodash');

mongoose.Promise = global.Promise;

mongoose.connect(uri, {
  useMongoClient: true
}).then(function(data) {
}).catch(function(error) {
  console.log(error);
});

class Cleaner {
  static async clean() {
    let tips = await Tip.find({});

    tips.forEach((tip) => {
      Tip.findOneAndUpdate({_id: tip._id}, {score: null}).then(tip => {
        Tip.findOne({_id: tip._id}).then(updated => {
          console.log(updated);
        })
      })
    })
  }
}

Cleaner.clean();
