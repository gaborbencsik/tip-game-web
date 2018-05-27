const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TeamSchema = new Schema({
  group: {
    type: String,
    required: [true]
  },
  crestURI: {
    type: String
  },
  team: {
    type: String,
    required: [true]
  },
  teamId: {
    type: Number
  },
  rank: {
    type: Number,
    required: [true]
  },
  playedGames: {
    type: Number,
    required: [true]
  },
  points: {
    type: Number,
    required: [true]
  },
  goals: {
    type: Number,
    required: [true]
  },
  goalsAgainst: {
    type: Number,
    required: [true]
  },
  goalDifference: {
    type: Number,
    required: [true]
  }
});

const Team = mongoose.model('team', TeamSchema);

module.exports = Team;
