const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CompetitionOrderSchema = new Schema({
  userId: {
    type: String,
    required: [true]
  },
  date: {
    type: Date,
    required: [true]
  },
  order: {
    type: Object,
    required: [true]
  },
  competition: {
    type: String,
    default: "Bundesliga"
  }
});

const CompetitionOrder = mongoose.model('competitionOrder', CompetitionOrderSchema);

module.exports = CompetitionOrder;
