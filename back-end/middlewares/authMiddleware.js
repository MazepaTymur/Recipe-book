const jwt = require('jsonwebtoken');

module.exports = {
  checkPassword: async (req, res, next) => {
    try {
      const { password } = req.body;
      const hash_password = req.user.password;
      if (!password) {
        next(new ApiError(401, 'Password missing'));
      }
      const comp_password = await bcrypt.compare(password, hash_password);
      if (!comp_password) {
        next(new ApiError(401, 'Incorrect password'));
      }
      next();
    } catch (err) {
      next(new ApiError(500, err.message || 'Error password'));
    }
  },
  tokenVerification: async (req, res, next) => {
    try {
      const token = req.headers['authorization'];
      const typeToken = req.headers['typeToken'];

      if (!token) {
        next(new ApiError(401, 'Token missing'));
      }
      const typeKey =
        typeToken === 'access' ? ACCESS_TOKEN_SECRET : REFRESH_TOKEN_SECRET;
      req.user._id = await jwt.verify(token, typeKey);
      next();
    } catch (err) {
      next(new ApiError(401, err.message || 'Invalid token'));
    }
  },
};
