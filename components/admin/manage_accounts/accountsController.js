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
    userService.banUser(email, active, sociallogin);
    res.status(200).json("Success");
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.activeClasses = async (req, res) => {
  try {
    const { id, active } = req.body.data;
    console.log(id);
    userService.activeClass(id, active);
    res.status(200).json("Success");
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getStudentIds = async (req, res) => {
  try {
    const result = await userService.getStudentIds();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.mapStudentId = async (req, res) => {
  try {
    const { id, userId } = req.body;
    const result = await userService.mapStudentId(id, userId);
    res.status(200).json("Success");
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.mapListStudentId = async (req, res) => {
  try {
    const { data } = req.body;

    const result = await userService.mapListStudentId(data);
    res.status(200).json("Success");
  } catch (error) {
    res.status(500).json(error);
  }
};