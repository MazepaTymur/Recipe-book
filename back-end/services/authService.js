const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ApiError = require('../middlewares/apiError');
const authConfig = require('../config/authConfig');
const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;

module.exports = {
  hashPassword: (password) => bcrypt.hash(password, authConfig.hashLevel),
  generateTokens: (_id) => {
    try {
      if (!_id) {
        throw new ApiError(401, 'Incorrect data, token was not created.');
      }
      const access_token = jwt.sign({ _id }, ACCESS_TOKEN_SECRET, {
        expiresIn: authConfig.accessTokenTime,
      });
      const refresh_token = jwt.sign({ _id }, REFRESH_TOKEN_SECRET, {
        expiresIn: authConfig.refreshTokenTime,
      });
      return { access_token, refresh_token };
    } catch (err) {
      throw new ApiError(500, err.message || 'Error generate tokens.');
    }
  },
};
