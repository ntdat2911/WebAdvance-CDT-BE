const express = require('express');
const router = express.Router();
const manageController = require('./manage_accounts/accountsController');
const middlewareToken = require('../../middleware/auth');

//manage users
router.get('/getStudents', middlewareToken.verifyToken,  manageController.getStudents);
router.get('/getTeachers', middlewareToken.verifyToken, manageController.getTeachers);
router.get('/getClasses', middlewareToken.verifyToken, manageController.getClasses);
router.post('/updateUsers', middlewareToken.verifyToken, manageController.updateUsers);
router.post('/banUsers', middlewareToken.verifyToken, manageController.banUsers);

//manage classes
router.post('/activeClass', middlewareToken.verifyToken, manageController.activeClasses);

//student id
router.get('/getStudentIds',middlewareToken.verifyToken,  manageController.getStudentIds);
router.post('/mapStudentId', middlewareToken.verifyToken, manageController.mapStudentId);
router.post('/mapListStudentIds', middlewareToken.verifyToken, manageController.mapListStudentId);

module.exports = router;