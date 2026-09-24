const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  age: {
    type: Number,
    required: true,
    min: 0,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'is not a valid email address'],
  },
});
const UsersModel = mongoose.model('users', UserSchema);

module.exports = UsersModel;
