const userService = require("./accountsService");

exports.getStudents = async (req, res) => {
  try {
    const user = await userService.getAllUsers("student");
    res.json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getTeachers = async (req, res) => {
  try {
    const user = await userService.getAllUsers("teacher");
    res.json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getClasses = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userService.getUser(id);
    res.json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.updateUsers = async (req, res) => {
  try {
    console.log(req.body);
    const { email } = req.body;
    userService.updateUser(id, name, email, avatar);
    res.status(200).json("Success");
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.banUsers = async (req, res) => {
  try {
    const { email, active, sociallogin } = req.body.user;
    console.log(email);
    userService.banUser(email, active, sociallogin);
    res.status(200).json("Success");
  } catch (error) {
    res.status(500).json(error);
  }
};
