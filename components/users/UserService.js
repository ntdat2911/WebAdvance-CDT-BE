const userRepository = require("./UserRepository");

exports.getUser = async (id) => {
  let user = await userRepository.getUser(id);
  delete user[0].password;
  return user;
};

exports.updateUser = async (id, name, email, avatar) => {
  return await userRepository.updateUser(name, email, avatar, id);
};

exports.setStudentId = async (id, idUser) => {
  return await userRepository.setStudentId(id, idUser);
};

exports.getStudentIds = async () => {
  return await userRepository.getStudentIds();
};

exports.getStudentId = async (id) => {
  return await userRepository.getStudentId(id);
};

// update image in account
exports.updateImage = async (id, image) => {
  return await userRepository.updateImage(id, image);
};
