const db = require("../../db/index");

exports.getAClass = async (id) => {
  const result = await db.connection.execute(
    "select * from class where id = ?",
    [id]
  );
  return result[0].length > 0 ? result[0] : null;
};

exports.insertAClass = async (
  className,
  createdBy,
  description,
  title,
  topic,
  room
) => {
  const result = await db.connection.execute(
    "insert into class (name,createdBy,description,title,topic,room,active) values (?,?,?,?,?,?,1)",
    [className, createdBy, description, title, topic, room]
  );
  return result[0].insertId;
};

exports.updateAClass = async (
  classId,
  className,
  description,
  title,
  topic,
  room
) => {
  const result = await db.connection.execute(
    "update class set name=?,description=?,title=?,topic=?,room=? where id=?",
    [className, description, title, topic, room, classId]
  );
  return result[0];
};

exports.updateActive = async (id, status) => {
  const result = await db.connection.execute(
    "update class set active= ? where id=?",
    [status, id]
  );
  return result[0];
};

exports.getStudentClass = async (id) => {
  const result = await db.connection.execute(
    "SELECT enrollment.*, class.* FROM enrollment INNER JOIN class ON enrollment.classId = class.id WHERE enrollment.userId = ? AND enrollment.role = ?",
    [id, "student"]
  );
  return result[0].length > 0 ? result[0] : null;
};

exports.getTeacherClass = async (id) => {
  try {
    const result = await db.connection.execute(
      "SELECT enrollment.*, class.* FROM enrollment INNER JOIN class ON enrollment.classId = class.id WHERE enrollment.userId = ? AND enrollment.role = ?",
      [id, "teacher"]
    );
    return result[0].length > 0 ? result[0] : null;
  } catch (error) {
    console.log(error);
  }
};

exports.getGrades = async (idClass) => {
  const result = await db.connection.execute(
    "SELECT grade.*, accounts.fullname FROM grade JOIN accounts ON grade.idUser = accounts.id WHERE grade.idClass = ?",
    [idClass]
  );
  return result[0].length > 0 ? result[0] : null;
};

exports.getGradeStructures = async (id) => {
  const result = await db.connection.execute(
    "SELECT * from gradeStructure where id = ?",
    [id]
  );
  console.log(result)
  return result[0].length > 0 ? result[0] : null;
};