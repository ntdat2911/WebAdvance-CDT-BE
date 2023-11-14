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

module.exports = router;
