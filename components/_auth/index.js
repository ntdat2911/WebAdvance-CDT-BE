const express = require('express');
const router = express.Router();

const authorizeController = require('./AuthController');


//router.get('/register', authorizeController.showRegisterForm);
router.post('/signup', authorizeController.register);
router.post('/login', authorizeController.login);

module.exports = router;