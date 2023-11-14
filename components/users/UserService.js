const userRepository = require("./UserRepository");

exports.getUser = async (id) => {
  return await userRepository.getUser(id);
};

exports.updateUser = async (id, name, email, avatar) => {
  return await userRepository.updateUser(name, email, avatar, id);
};
