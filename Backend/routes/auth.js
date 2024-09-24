const express = require('express');
const authController = require('../controllers/authController');
const {isLoggedIn} = require('../middleware/authMiddleware');
const router = express.Router();


// User login
router.post('/login', authController.login);

// User signup
router.post('/register', authController.register);

// User logout
router.get('/logout', authController.logoutUser);

// User refresh token
router.get('/refresh-token', authController.refreshToken);

// User is authenticated
router.get('/isLoggedIn', isLoggedIn, authController.isLoggedIn);

//Forgot password
router.post('/forgotPass', authController.forgotPass);

// redirect to reset password page
router.get('/:mobileNo/resetPass', authController.resetPass);

// render reset password page
router.get('/resetPass/:userId', authController.resetPassPage);

// update the password
router.post('/updatePass/:userId', authController.updatePass);


module.exports = router;
