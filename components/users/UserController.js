const userService = require("./UserService");

exports.getOneUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await userService.getUser(id);
    console.log(user);
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
