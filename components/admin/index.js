const express = require('express');
const router = express.Router();
const manageController = require('./manage_accounts/accountsController');
const middlewareToken = require('../../middleware/auth');

router.get('/getStudents', middlewareToken.verifyToken, manageController.getStudents);
router.get('/getTeachers', middlewareToken.verifyToken, manageController.getTeachers);
router.get('/getClasses', middlewareToken.verifyToken, manageController.getClasses);


module.exports = router;