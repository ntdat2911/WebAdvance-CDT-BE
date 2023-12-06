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
