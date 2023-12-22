const express = require("express");
const router = express.Router();

const classController = require("./ClassController");
const enrollmentController = require("./user_class/EnrollmentController");

router.get("/getAClass/:id", classController.getAClass);
router.post("/getStudentClasses", classController.getStudentClass);
router.post("/getTeacherClasses", classController.getTeacherClass);

router.post("/insertClass", classController.insertAClass);
router.post("/updateClass", classController.updateAClass);

router.post("/insertEnrollment", enrollmentController.insertEnrollment);


//teacher
router.get("/getGrades/:id", classController.getGrades);
router.get("/getGradeStructures/:id", classController.getGradeStructures);
module.exports = router;
