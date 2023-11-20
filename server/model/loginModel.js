// userModel.js

const mongoose = require('mongoose');

// Define the schema for the User model
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  }
});

const User = mongoose.model('admin', userSchema);

module.exports = User;
