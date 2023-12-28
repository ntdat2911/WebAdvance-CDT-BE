const express = require("express");
const router = express.Router();

const userController = require("./UserController");
const middlewareToken = require("../../middleware/auth");

router.get(
  "/getUser/:id",
  userController.getOneUser
);
router.post("/update", userController.update);

//get List studentId
router.get("/getStudentIds", userController.getStudentIds);
router.get("/getStudentId", userController.getStudentId);

module.exports = router;
