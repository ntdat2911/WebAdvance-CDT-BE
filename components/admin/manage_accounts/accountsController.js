const userService = require("./accountsService");

exports.getStudents = async (req, res) => {
  try {
    const user = await userService.getAllUsers();
    res.json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getTeachers = async (req, res) => {
  try {
    const user = await userService.getAllUsers();
    res.json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getClasses = async (req, res) => {
  try {
    const result = await userService.getAllClasses();
    res.json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.updateUsers = async (req, res) => {
  try {
    console.log(req.body);
    const { id, fullname, birthday } = req.body;
    userService.updateUser(id, fullname, birthday);
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
