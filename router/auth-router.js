const express = require('express');
const authController = require('../controllers/auth-controller');
const validate = require('../middlewares/validate-middleware');
const { signupSchema } = require('../validators/auth-validator');
const { loginSchema } = require('../validators/auth-validator');
const authMiddleware = require('../middlewares/auth-middleware');
const router = express.Router();

// POST /api/auth/signup: Register a new user.
router.route('/signup').post(validate(signupSchema), authController.signup);

// POST /api/auth/login: Authenticate a user and return a JWT.
router.route('/login').post(validate(loginSchema), authController.login);

// GET /api/auth/profile: Retrieve the authenticated user's profile information.
router.route('/profile').get(authMiddleware, authController.profile);

// PUT /api/auth/profile: Update the authenticated user's profile information.
router
  .route('/profile/:id')
  .put(authMiddleware, authController.updateProfileById);

// DELETE /api/auth/profile: Delete the authenticated user's account.
router
  .route('/profile/delete/:id')
  .delete(authMiddleware, authController.deleteProfileById);

module.exports = router;
