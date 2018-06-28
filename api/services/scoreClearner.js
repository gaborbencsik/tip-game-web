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
    let users = await User.find({})

    await Cleaner.cleanTipScores(tips);
    await Cleaner.cleanUserTotalScore(users);

    console.log(JSON.stringify({
      message: 'Cleanup finished',
      timestamp: new Date,
      process_id: process.pid
    }));
    
    process.exit(0);
  }

  static async cleanTipScores(tips) {
    for (let tip of tips) {
      await Tip.findOneAndUpdate({_id: tip._id}, {score: null})
    }
  }

  static async cleanUserTotalScore(users) {
    for (let user of users) {
      await Cleaner.clearScore(user)
    }
  }

  static async clearScore(user) {
    await User.findOneAndUpdate({_id: user._id}, {score: 0})
  }
}

Cleaner.clean();
