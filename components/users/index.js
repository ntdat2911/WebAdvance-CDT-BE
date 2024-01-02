const express = require("express");
const router = express.Router();

const userController = require("./UserController");
const middlewareToken = require("../../middleware/auth");

router.get("/getUser/:id", userController.getOneUser);
router.post("/update", userController.update);

router.post("/setStudentId", userController.setStudentId);

//get List studentId
router.get("/getStudentIds", userController.getStudentIds);
router.get("/getStudentId/:id", userController.getStudentId);

//update image
router.put("/updateImage", userController.updateImage);
module.exports = router;
