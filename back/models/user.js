// Import mongoose
const mongoose = require('mongoose');
// Import mongoose unique validator to validate the email address uniqueness
const uniqueValidator = require('mongoose-unique-validator');

// Set user model
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);