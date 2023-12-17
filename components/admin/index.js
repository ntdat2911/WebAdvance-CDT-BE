const express = require('express');
const router = express.Router();
const manageController = require('./manage_accounts/accountsController');
const middlewareToken = require('../../middleware/auth');

//manage users
router.get('/getStudents',  manageController.getStudents);
router.get('/getTeachers',  manageController.getTeachers);
router.get('/getClasses',  manageController.getClasses);
router.post('/updateUsers',  manageController.updateUsers);
router.post('/banUsers',  manageController.banUsers);

//manage classes
router.post('/activeClass',  manageController.activeClasses);

//student id
router.get('/getStudentIds',  manageController.getStudentIds);
router.post('/mapStudentId',  manageController.mapStudentId);
router.post('/mapListStudentIds',  manageController.mapListStudentId);

module.exports = router;