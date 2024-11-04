const ApiError = require('../middlewares/apiError');
const authService = require('../services/authService');
const userService = require('../services/userService');

module.exports = {
  registerUser: async (req, res, next) => {
    try {
      const password = await authService.hashPassword(req.body.password);
      const userDoc = await userService.Create({ ...req.body, password });
      const user = userDoc.toObject();
      if (user._id) {
        const auth = await authService.generateTokens(user._id);
        user._id = undefined;
        user.password = undefined;
        res.status(201).json({ auth, user });
        console.log(user);
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
      const { user } = req;
      const auth = await authService.generateTokens(user._id);
      user._id = undefined;
      user.password = undefined;
      res.status(201).json({ auth, user });
      next();
    } catch (err) {
      next(err);
    }
  },
  getUser: async (req, res, next) => {
    try {
      const { user } = req;
      user._id = undefined;
      user.password = undefined;
      res.status(201).json({ user });
      next();
    } catch (err) {
      next(err);
    }
  },
  changeNickname: async (req, res, next) => {
    try {
      const { _id } = req.user;
      const { name } = req.body;

      const response = await userService.Update({ _id }, { name });
      res.status(200).json({ response: response.acknowledged, name });
      next();
    } catch (err) {
      next(err);
    }
  },
  deleteUser: async (req, res, next) => {
    try {
      const { _id } = req.user;
      const response = await userService.Delete({ _id });
      res.status(200).json({ response: response.acknowledged });
      next();
    } catch (err) {
      next(err);
    }
  },
};
