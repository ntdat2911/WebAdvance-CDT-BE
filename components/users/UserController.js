const userService = require("./UserService");

exports.getOneUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await userService.getUser(id);
    res.json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.update = async (req, res) => {
  try {
    console.log(req.body);
    const { id, name, email, avatar } = req.body;
    userService.updateUser(id, name, email, avatar);
    res.status(200).json("Success");
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.setStudentId = async (req, res) => {
  try {
    const { id, idUser, idClass } = req.body;
    userService.setStudentId(id, idUser, idClass);
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

exports.getStudentId = async (req, res) => {
  try {
    const { id, classId } = req.body;
    const result = await userService.getStudentId(id, classId);
    console.log(result)
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.updateImage = async (req, res) => {
  try {
    const { id, image } = req.body;
    const result = await userService.updateImage(id, image);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};
