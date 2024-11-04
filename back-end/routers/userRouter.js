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
  authMiddleware.passwordCheck,
  userController.loginUser
);
router.post(
  '/auth/token',
  authMiddleware.tokenVerification('access'),
  userMiddleware.userNotFound,
  userController.getUser
);
router.post(
  '/auth/refresh',
  authMiddleware.tokenVerification('refresh'),
  userMiddleware.userNotFound,
  userController.loginUser
);
router.put(
  '/changeNickname',
  authMiddleware.tokenVerification('access'),
  userMiddleware.userNotFound,
  userController.changeNickname
);
router.delete(
  '/deleteAccount',
  authMiddleware.tokenVerification('access'),
  userMiddleware.userNotFound,
  authMiddleware.passwordCheck,
  userController.deleteUser
);

module.exports = router;
