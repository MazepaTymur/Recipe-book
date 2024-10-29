const router = require('express').Router();

const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const userMiddleware = require('../middlewares/userMiddleware');

router.post(
  '/register',
  userMiddleware.emailIsAlreadyRegistered,
  userController.registerUser
);
router.post(
  '/login',
  userMiddleware.userNotFound,
  authMiddleware.checkPassword,
  userController.loginUser
);
router.post('/auth', authMiddleware.tokenVerification);

module.exports = router;
