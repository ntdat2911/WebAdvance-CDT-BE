const express = require('express');
const router = express.Router();
const manageController = require('./manage_accounts/accountsController');
const middlewareToken = require('../../middleware/auth');

router.get('/getStudents',  manageController.getStudents);
router.get('/getTeachers',  manageController.getTeachers);
router.get('/getClasses',  manageController.getClasses);
router.post('/updateUsers',  manageController.updateUsers);
router.post('/banUsers',  manageController.banUsers);


module.exports = router;