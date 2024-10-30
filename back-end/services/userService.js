const User = require('../models/userModel');

module.exports = {
  Create: obj => User.create(obj),
  Find: obj => User.findOne(obj),
  Update: (query, update) => User.updateOne(query, {$set: update}),
};