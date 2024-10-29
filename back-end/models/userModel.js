const { Schema, model } = require('mongoose');
const { usersDB } = require('./connections');

const userSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  access: [{ type: String, default: 'user' }],
});

module.exports = usersDB.model('users', userSchema);