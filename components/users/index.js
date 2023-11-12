const express = require('express');
const router = express.Router();

const userController = require('./UserController');
const middlewareToken = require('../../middleware/auth');

router.get("/home-page", middlewareToken.verifyToken, userController.getAll);

module.exports = router;