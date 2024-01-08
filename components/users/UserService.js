const userRepository = require("./UserRepository");

exports.getUser = async (id) => {
  let user = await userRepository.getUser(id);
  delete user[0].password;
  return user;
};

exports.updateUser = async (id, name, email, birthday) => {
  return await userRepository.updateUser(name, email, birthday, id);
};

exports.setStudentId = async (id, idUser, idClass) => {
  return await userRepository.setStudentId(id, idUser, idClass);
};

exports.getStudentIds = async () => {
  return await userRepository.getStudentIds();
};

exports.getStudentId = async (id, classId) => {
  return await userRepository.getStudentId(id, classId);
};

// update image in account
exports.updateImage = async (id, image) => {
  return await userRepository.updateImage(id, image);
};

exports.getFullName = async (id) => {
  return await userRepository.getFullName(id);
};
