const enrollmentRepository = require("./EnrollmentRepository");

exports.getEnrollmentByUserId = async (id) => {
  return await enrollmentRepository.getEnrollmentByUserId(id);
};

exports.getEnrollmentByClassId = async (id) => {
  return await enrollmentRepository.getEnrollmentByClassId(id);
};

exports.insertEnrollment = async (userId, classId, role) => {
  return await enrollmentRepository.insertEnrollment(userId, classId, role);
};
