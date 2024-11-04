const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ApiError = require('./apiError');
const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;

module.exports = {
  passwordCheck: async (req, res, next) => {
    try {
      const { password } = req.body;
      const hash_password = req.user.password;

      if (!password) {
        next(new ApiError(401, 'Password missing.'));
      }
      const comp_password = await bcrypt.compare(password, hash_password);
      if (!comp_password) {
        next(new ApiError(401, 'Incorrect password.'));
      }
      next();
    } catch (err) {
      next(new ApiError(500, err.message || 'Error password.'));
    }
  },
  accessСheck: (accessName) => {
    return async (req, res, next) => {
      try {
        const { access } = req.user;
        if (!access) {
          next(new ApiError('The user does not have an access field.', 404));
        }
        if (!access.includes(accessName)) {
          next(new ApiError('User access denied.', 403));
        }
        next();
      } catch (err) {
        next(err);
      }
    };
  },
  tokenVerification: (typeToken = 'access') => {
    return async (req, res, next) => {
      try {
        const token = req.get('Authorization');
        if (!token) {
          next(new ApiError(401, 'Token missing'));
        }
        const typeKey =
          typeToken === 'access' ? ACCESS_TOKEN_SECRET : REFRESH_TOKEN_SECRET;
        const { _id } = await jwt.verify(token, typeKey);
        req.body = { ...req.body, _id };
        next();
      } catch (err) {
        next(new ApiError(401, err.message || 'Invalid token.'));
      }
    };
  },
};
