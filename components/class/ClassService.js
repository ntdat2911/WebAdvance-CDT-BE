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

exports.getGrades = async (id) => {
  const result =  await classRepository.getGrades(id);
  const updatedData = result.map(item => {
    return {
      id: item.id,
      fullname: item.fullname,
      homework: item.homework,
      midterm: item.midterm,
      final: item.final,
      sum: item.sum
    };
  });
  return updatedData;
};

exports.getGradeStructures = async (id) => {
  const result =  await classRepository.getGradeStructures(id);
  const newResult = [];
  Object.entries(result[0]).forEach(([key, value], index) => {
    if (key !== 'id') {
      newResult.push({ id: index + 1, percentage: key, value });
    }
  });
  return newResult;
};