const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TipSchema = new Schema({
  matchId: {
    type: Number,
    required: [true]
  },
  userId: {
    type: String,
    required: [true]
  },
  lastModified: {
    type: Date,
    required: [true]
  },
  homeGoals: {
    type: Number,
    required: [true]
  },
  awayGoals: {
    type: Number,
    required: [true]
  }
});

const Tip = mongoose.model('tip', TipSchema);

module.exports = Tip;
