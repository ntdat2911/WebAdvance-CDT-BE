const db = require("../../../db/index");

exports.getEnrollmentByUserId = async (id) => {
  const result = await db.connection.execute(
    "select * from enrollment where userId = ?",
    [id]
  );
  return result[0].length > 0 ? result[0] : null;
};

exports.getEnrollmentByClassId = async (id) => {
  const result = await db.connection.execute(
    "select * from enrollment where classId = ?",
    [id]
  );
  return result[0].length > 0 ? result[0] : null;
};

exports.insertEnrollment = async (userId, classId, role) => {
  const result = await db.connection.execute(
    "insert into enrollment (userId,classId,role) values (?,?,?)",
    [userId, classId, role]
  );
  return result[0];
};
//count number of students in a class by classId
exports.countStudent = async (id) => {
  const result = await db.connection.execute(
    "select count(*) as count from enrollment where classId = ? and role = 'student'",
    [id]
  );
  return result[0][0].count;
};
//count number of teachers in a class by classId
exports.countTeacher = async (id) => {
  const result = await db.connection.execute(
    "select count(*) as count from enrollment where classId = ? and role = 'teacher'",
    [id]
  );
  return result[0][0].count;
};

//get enrollment by userId and classId
exports.getEnrollmentByUserIdAndClassId = async (userId, classId) => {
  const result = await db.connection.execute(
    "select role from enrollment where userId = ? and classId = ?",
    [userId, classId]
  );
  return result[0].length > 0 ? result[0][0] : null;
};
