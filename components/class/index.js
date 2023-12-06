const express = require("express");
const router = express.Router();

const classController = require("./ClassController");
const enrollmentController = require("./user_class/EnrollmentController");

router.get("/getAClass/:id", classController.getAClass);
router.post("/insertClass", classController.insertAClass);
router.post("/updateClass", classController.updateAClass);

router.post("/insertEnrollment", enrollmentController.insertEnrollment);

module.exports = router;
