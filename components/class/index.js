const express = require("express");
const router = express.Router();

const classController = require("./ClassController");
const enrollmentController = require("./user_class/EnrollmentController");

router.get("/getAClass/:id", classController.getAClass);
router.get("/getListStudentIds/:id", classController.getListStudentIds);
router.post("/getStudentClasses", classController.getStudentClass);
router.post("/getTeacherClasses", classController.getTeacherClass);
//cofig class info
router.post("/insertClass", classController.insertAClass);
router.post("/updateClass", classController.updateAClass);
//invite code
router.post("/getInviteCode", classController.getInviteCode);
router.post("/resetInviteCode", classController.resetInviteCode);
router.post("/getClassByCode", classController.getClassByCode);

//
router.post("/insertEnrollment", enrollmentController.insertEnrollment);
router.post(
  "/getRoleInClass",
  enrollmentController.getRoleEnrollmentByUserIdAndClassId
);

//teacher
router.get("/getGrades/:id", classController.getGrades);
router.post("/updateGrade", classController.updateGrade);
router.post("/updateGrades", classController.updateGrades); //update by FILE CSV
router.get("/getGradeStructures/:id", classController.getGradeStructures);
router.post("/addGradeStructure", classController.addGradeStructure);
router.post(
  "/updateRowGradeStructures",
  classController.updateRowGradeStructures
);
router.post("/updateGradeStructure", classController.updateGradeStructure);
router.post("/finalGradeStructure", classController.finalGradeStructure);
router.post("/deleteGradeStructure", classController.deleteGradeStructure);

//student
router.post("/student/getGrades", classController.getGradesStudent);
router.get(
  "/student/getGradeStructures/:id",
  classController.getGradeStructuresStudent
);
router.post("/updateGrade", classController.updateGrade);

//notificaiton
router.post("/getNotifications", classController.getNotifications);
router.post("/setReadNotifications", classController.setReadNotifications);
module.exports = router;
