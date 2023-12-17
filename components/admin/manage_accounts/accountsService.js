const userRepository = require("./accountsRepository");

exports.getAllUsers = async () => {
  return await userRepository.getAllUsers("user");
};

exports.getAllClasses = async () => {
  return await userRepository.getAllClasses();
};

exports.updateUser = async (id, name, birthday) => {
  return await userRepository.updateUser(id, name, birthday);
};

exports.banUser = async (email, active, social) => {
  return await userRepository.banUser(email, active, social);
};

exports.activeClass = async (id, value) => {
  return await userRepository.activeClass(id, value);
}; 

exports.getStudentIds = async () => {
  return await userRepository.getStudentIds();
};

exports.mapStudentId = async (id, studentId) => {
  return await userRepository.mapStudentId(id, studentId);
};

exports.mapListStudentId = async (data) => {
  return await userRepository.mapListStudentId(data);
};

