const express = require('express');
const router = express.Router();

const authorizeController = require('./AuthController');
const middlewareToken = require('../../middleware/auth');

//router.get('/register', authorizeController.showRegisterForm);
router.post('/signup', authorizeController.register);
router.post('/login', authorizeController.login);
//router.post('/logout', middlewareToken.verifyToken, authorizeController.logout);


module.exports = router;