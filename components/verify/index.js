const express = require("express");
const router = express.Router();

const verifyController = require('./verifyController');

router.get('/', verifyController.showAccount);
router.get('/verifyAccount', verifyController.emailAccount); //waiting
router.get('/verifyPassword', verifyController.emailPassword);

router.get('/verifiedAccount', verifyController.verifyAccount); //da xac thuc
router.get('/verifiedPassword', verifyController.verifyPassword);
router.post('/verifiedPassword', verifyController.resetPassword);

module.exports = router;