const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  age: {
    type: Number,
  },
  email: {
    type: String,
  },
});
const UsersModel = mongoose.model('users', UserSchema);

module.exports = UsersModel;
