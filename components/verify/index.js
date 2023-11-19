const express = require("express");
const router = express.Router();

const verifyController = require('./verifyController');
const middlewareToken = require("../../middleware/resetpassword");

//xac thuc tai khoan
router.get('/verifyAccount', verifyController.emailAccount); //waiting
router.get('/verifiedAccount', verifyController.verifyAccount); //da xac thuc

 
//forgot password
router.get('/forgot-password', verifyController.resetPassword);
//router.get('/forgot-password', verifyController.forgotPassword); 
router.post('/forgot-password', middlewareToken.verifyToken, verifyController.resetPasswordSuccess);


module.exports = router;