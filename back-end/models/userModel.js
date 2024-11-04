const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  access: { type: [String], default: ['user'] },
});

module.exports = model('User', userSchema);
