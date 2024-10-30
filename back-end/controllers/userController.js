const ApiError = require('../middlewares/apiError');
const authService = require('../services/authService');
const userService = require('../services/userService');

module.exports = {
  registerUser: async (req, res, next) => {
    try {
      const password = await authService.hashPassword(req.body.password);
      const { _id } = await userService.Create({ ...req.body, password });

      if (_id) {
        const tokens = await authService.generateTokens(_id);
        res.status(201).json(tokens);
      } else {
        return next(new ApiError(500, 'Error _id'));
      }

      next();
    } catch (err) {
      next(err);
    }
  },
  loginUser: async (req, res, next) => {
    try {
      const {} = req.body;
      next();
    } catch (err) {
      next(err);
    }
  },
};
