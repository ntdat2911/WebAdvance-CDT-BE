const express = require('express');
const router = express.Router();
const authorizeController = require('./AuthController');
const middlewareToken = require('../../middleware/auth');
const passport = require('../../passport');
//router.get('/register', authorizeController.showRegisterForm);
router.post('/signup', authorizeController.register);
router.post('/login', authorizeController.login);
//router.post('/logout', middlewareToken.verifyToken, authorizeController.logout);

require('dotenv').config();

//login GOOGLE
router.get('/google', authorizeController.loginGoogle);
router.get('/google/callback', authorizeController.authenticateGoogle, authorizeController.callbackGoogle);

//login Facebook
//router.get('/facebook', authorizeController.loginFacebook);
router.get('/facebook', passport.authenticate('facebook'));
router.get('/facebook/callback', authorizeController.authenticateFacebook, authorizeController.callbackFacebook);


module.exports = router;