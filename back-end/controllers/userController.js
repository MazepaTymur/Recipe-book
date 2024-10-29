const authService = require('../servises/authService');
const userServise = require('../servises/userServise');

module.exports = {
  registerUser: async (req, res, next) => {
    try {
      const password = await authService.hashPassword(req.body.password);
      const { _id } = userServise.Create({ ...req.body, password });
      const tokens = authService.generateTokens(_id);
      res.status(201).json(tokens);
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
