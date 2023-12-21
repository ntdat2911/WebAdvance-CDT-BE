const classRepository = require("./ClassRepository");

exports.getAClass = async (id) => {
  return await classRepository.getAClass(id);
};

exports.insertAClass = async (
  className,
  createdBy,
  description,
  title,
  topic,
  room
) => {
  return await classRepository.insertAClass(
    className,
    createdBy,
    description,
    title,
    topic,
    room
  );
};

exports.updateAClass = async (
  classId,
  className,
  description,
  title,
  topic,
  room
) => {
  return await classRepository.updateAClass(
    classId,
    className,
    description,
    title,
    topic,
    room
  );
};

exports.getStudentClass = async (id) => {
  return await classRepository.getStudentClass(id);
};

exports.getTeacherClass = async (id) => {
  return await classRepository.getTeacherClass(id);
};

exports.updateActive = async (id, status) => {
  return await classRepository.updateActive(id, status);
};
