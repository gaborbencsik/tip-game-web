const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TeamSchema = new Schema({
  code: {
    type: String,
    required: [true]
  },
  name: {
    type: String,
    required: [true]
  },
  shortName: {
    type: String,
    required: [true]
  },
  logoUrl: {
    type: String,
    required: [true]
  },
  links: {
    type: Object,
    required: [true]
  }

});

const Team = mongoose.model('team', TeamSchema);

module.exports = Team;
