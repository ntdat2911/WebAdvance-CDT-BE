const authorizeService = require("./AuthService");
const jwt = require("jsonwebtoken");
const verifyToken = require("../../middleware/auth");
const bcrypt = require("bcrypt");
require("dotenv").config();

exports.register = async (req, res) => {
  console.log(req.body);
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(req.body.password, salt);
  const user = await authorizeService.register(
    req.body.fullname,
    req.body.email,
    hash
  );
  console.log(user + "Controller");
  if (user.insertId) res.status(200).json("Insert Successfully");
  else res.status(500).json("Insert Error");
};

exports.login = async (req, res) => {
  const user = await authorizeService.getUserByEmail(req.body.email);

  if (!user) {
    res.status(404).json("No user found");
  } else {
    const validPassword = await bcrypt.compare(
      req.body.password,
      user[0].password
    );
    if (!validPassword) {
      res.status(404).json("Wrong password");
    } else {
      console.log(process.env.ACCESS_TOKEN_SECRET + " My env");
      const accessToken = jwt.sign(
        { email: user.email },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1d" }
      );
      res.cookie("token", accessToken);
      delete user[0].password;
      console.log(user);
      res.json({
        user,
        accessToken,
      });
    }
  }
};
