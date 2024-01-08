const express = require("express");
const router = express.Router();

const userController = require("./UserController");
const middlewareToken = require("../../middleware/auth");

router.get(
  "/getUser/:id",
  middlewareToken.verifyToken,
  userController.getOneUser
);
router.post("/update", middlewareToken.verifyToken, userController.update);

router.post(
  "/setStudentId",
  middlewareToken.verifyToken,
  userController.setStudentId
);

//get List studentId
router.get(
  "/getStudentIds",
  middlewareToken.verifyToken,
  userController.getStudentIds
);
router.post(
  "/getStudentId",
  middlewareToken.verifyToken,
  userController.getStudentId
);

//update image
router.put(
  "/updateImage",
  middlewareToken.verifyToken,
  userController.updateImage
);
module.exports = router;
