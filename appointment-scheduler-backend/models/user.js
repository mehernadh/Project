// backend/models/user.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  // Add other fields relevant to users
});

const User = mongoose.model('User', userSchema);

module.exports = User;
