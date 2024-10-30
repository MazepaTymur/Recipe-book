const userService = require('../services/userService');
const ApiError = require('./apiError');

module.exports = {
  emailIsAlreadyRegistered: async (req, res, next) => {
    try {
      const { email } = req.body;
      if (!email) {
        next(new ApiError(401, 'Incorrect email.'));
      }

      const user = await userService.Find({ email });
      if (user) {
        console.log('UM', user);

        next(
          new ApiError(
            409,
            'Email is already registered. Please use another email or log in.'
          )
        );
      }
      next();
    } catch (err) {
      next(err);
    }
  },
  userNotFound: async (req, res, next) => {
    try {
      const { email, _id } = req.body;

      if (email || _id) {
        const user = await userService.Find(email ? { email } : { _id });

        if (!user) {
          return next(new ApiError(404, 'User not found'));
        }
        req.user = user;
      }
      next();
    } catch (err) {
      next(err);
    }
  },
};
