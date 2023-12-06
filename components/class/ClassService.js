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

exports.updateAClass = async (id, className) => {
  return await classRepository.updateAClass(
    id,
    className,
    description,
    title,
    topic,
    room
  );
};
