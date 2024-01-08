const enrollmentRepository = require("./EnrollmentRepository");

exports.getEnrollmentByUserId = async (id) => {
  return await enrollmentRepository.getEnrollmentByUserId(id);
};

exports.getEnrollmentByClassId = async (id) => {
  return await enrollmentRepository.getEnrollmentByClassId(id);
};

exports.insertEnrollment = async (userId, classId, role) => {
  //check if user is already in class
  const check = await enrollmentRepository.getEnrollmentByUserIdAndClassId(
    userId,
    classId
  );
  if (check) {
    return "User is already in class";
  }
  return await enrollmentRepository.insertEnrollment(userId, classId, role);
};
//count number of students in a class by classId
exports.countStudent = async (id) => {
  return await enrollmentRepository.countStudent(id);
};
//count number of teachers in a class by classId
exports.countTeacher = async (id) => {
  return await enrollmentRepository.countTeacher(id);
};

//get enrollment by userId and classId
exports.getRoleEnrollmentByUserIdAndClassId = async (userId, classId) => {
  return await enrollmentRepository.getEnrollmentByUserIdAndClassId(
    userId,
    classId
  );
};

// get id of enrollment by userId and classId
exports.getIdByUserIdAndClassId = async (userId, classId) => {
  return await enrollmentRepository.getIdByUserIdAndClassId(userId, classId);
};
