const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    index : { unique: true },
    unique : true,
    required: [true, 'Name is required.']
  },
  email: {
    type: String,
    index : { unique: true },
    unique : true,
    required: [true, 'Email is required.']
  },
  password: {
    type: String,
    equired: [true, 'Password is required.']
  },
  admin: {
    type: Boolean,
    default: false
  },
  registration: {
    type: Date,
    default: Date.now
  },
  last_seen: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
