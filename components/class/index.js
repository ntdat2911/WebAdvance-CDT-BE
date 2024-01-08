const express = require("express");
const router = express.Router();

const classController = require("./ClassController");
const enrollmentController = require("./user_class/EnrollmentController");
const middlewareToken = require("../../middleware/auth");

router.get(
  "/getAClass/:id",
  middlewareToken.verifyToken,
  classController.getAClass
);
router.get(
  "/getListStudentIds/:id",
  middlewareToken.verifyToken,
  classController.getListStudentIds
);
router.get(
  "/getParticipants/:id",
  middlewareToken.verifyToken,
  classController.getParticipants
);
router.post(
  "/getStudentClasses",
  middlewareToken.verifyToken,
  classController.getStudentClass
);
router.post(
  "/getTeacherClasses",
  middlewareToken.verifyToken,
  classController.getTeacherClass
);
//cofig class info
router.post(
  "/insertClass",
  middlewareToken.verifyToken,
  classController.insertAClass
);
router.post(
  "/updateClass",
  middlewareToken.verifyToken,
  classController.updateAClass
);
//invite code
router.post(
  "/getInviteCode",
  middlewareToken.verifyToken,
  classController.getInviteCode
);
router.post(
  "/resetInviteCode",
  middlewareToken.verifyToken,
  classController.resetInviteCode
);
router.post(
  "/getClassByCode",
  middlewareToken.verifyToken,
  classController.getClassByCode
);

//
router.post(
  "/insertEnrollment",
  middlewareToken.verifyToken,
  enrollmentController.insertEnrollment
);
router.post(
  "/getRoleInClass",
  middlewareToken.verifyToken,
  enrollmentController.getRoleEnrollmentByUserIdAndClassId
);

//teacher
router.get(
  "/getGrades/:id",
  middlewareToken.verifyToken,
  classController.getGrades
);
router.get(
  "/getStudentIds/:id",
  middlewareToken.verifyToken,
  classController.getStudentIds
);
router.post(
  "/updateGrade",
  middlewareToken.verifyToken,
  classController.updateGrade
);
router.post(
  "/updateGrades",
  middlewareToken.verifyToken,
  classController.updateGrades
); //update by FILE CSV
router.post(
  "/updateStudentId",
  middlewareToken.verifyToken,
  classController.updateStudentId
);
router.post(
  "/updateStudentIds",
  middlewareToken.verifyToken,
  classController.updateStudentIds
); //update by FILE CSV
router.get(
  "/getGradeStructures/:id",
  middlewareToken.verifyToken,
  classController.getGradeStructures
);
router.post(
  "/addGradeStructure",
  middlewareToken.verifyToken,
  classController.addGradeStructure
);
router.post(
  "/updateRowGradeStructures",
  middlewareToken.verifyToken,
  classController.updateRowGradeStructures
);
router.post(
  "/updateGradeStructure",
  middlewareToken.verifyToken,
  classController.updateGradeStructure
);
router.post(
  "/finalGradeStructure",
  middlewareToken.verifyToken,
  classController.finalGradeStructure
);
router.post(
  "/deleteGradeStructure",
  middlewareToken.verifyToken,
  classController.deleteGradeStructure
);

//student
router.post(
  "/student/getGrades",
  middlewareToken.verifyToken,
  classController.getGradesStudent
);
router.get(
  "/student/getGradeStructures/:id",
  middlewareToken.verifyToken,
  classController.getGradeStructuresStudent
);
router.post(
  "/updateGrade",
  middlewareToken.verifyToken,
  classController.updateGrade
);

//notificaiton
router.post(
  "/getNotifications",
  middlewareToken.verifyToken,
  classController.getNotifications
);
router.post(
  "/setReadNotifications",
  middlewareToken.verifyToken,
  classController.setReadNotifications
);

//get class created by user
router.post(
  "/getInfoTeacherOfClass",
  middlewareToken.verifyToken,
  classController.getInfoTeacherOfClass
);

//check user in class by email
router.post(
  "/checkUserInClass",
  middlewareToken.verifyToken,
  classController.checkUserInClass
);
//get id of enrollment by userId and classId
router.post(
  "/getIdByUserIdAndClassId",
  enrollmentController.getIdByUserIdAndClassId
);
router.post(
  "/inviteByEmail",
  middlewareToken.verifyToken,
  enrollmentController.inviteByEmail
);
//get a grade
router.post(
  "/getAGrade",
  middlewareToken.verifyToken,
  classController.getAGrade
);
//insert review grade
router.post(
  "/insertReviewGrade",
  middlewareToken.verifyToken,
  classController.insertReviewGrade
);
//get review grade by classId and userId
router.post(
  "/getReviewGrade",
  middlewareToken.verifyToken,
  classController.getReviewGrade
);
//getCommentByReviewGradeId
router.post(
  "/getCommentByReviewGradeId",
  middlewareToken.verifyToken,
  classController.getCommentByReviewGradeId
);

//insert comment
router.post(
  "/insertComment",
  middlewareToken.verifyToken,
  classController.insertComment
);
//get review grade by idReviewGrade
router.post(
  "/getReviewGradeById",
  middlewareToken.verifyToken,
  classController.getReviewGradeById
);
//getUserIdByReviewGradeId
router.post(
  "/getUserIdByReviewGradeId",
  middlewareToken.verifyToken,
  classController.getUserIdByReviewGradeId
);
//getTeacherIdByReviewGradeId
router.post(
  "/getTeacherIdByReviewGradeId",
  middlewareToken.verifyToken,
  classController.getTeacherIdByReviewGradeId
);

//get review grade by classId
router.post(
  "/getReviewGradeByClassId",
  middlewareToken.verifyToken,
  classController.getReviewGradeByClassId
);
//updateGradeAndStatusOfReviewGrade
router.post(
  "/updateGradeAndStatusOfReviewGrade",
  middlewareToken.verifyToken,
  classController.updateGradeAndStatusOfReviewGrade
);
//getRoleByReviewGradeId
router.post(
  "/getRoleByReviewGradeId",
  middlewareToken.verifyToken,
  classController.getRoleByReviewGradeId
);
module.exports = router;
