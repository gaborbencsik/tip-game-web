const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MatchSchema = new Schema({
  matchId: {
    type: Number,
    required: [true]
  },
  homeTeamName: {
    type: String,
    required: [true]
  },
  awayTeamName: {
    type: String,
    required: [true]
  },
  date: {
    type: Date,
    required: [true]
  },
  matchday: {
    type: String,
    required: [true]
  },
  homeGoals: {
    type: Number
  },
  awayGoals: {
    type: Number
  },
  halfTimeHomeGoals: {
    type: Number
  },
  halfTimeAwayGoals: {
    type: Number
  },
  status: {
    type: String
  }
});

const Match = mongoose.model('match', MatchSchema);

module.exports = Match;
