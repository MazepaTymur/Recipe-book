const user = require('../models/userModel');

module.exports = {
  Create: obj => user.create(obj),
  Find: obj => user.findOne(obj),
  Update: (query, update) => user.updateOne(query, {$set: update}),
};