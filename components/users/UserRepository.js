const db = require("../../db/index");

exports.getUser = async (id) => {
  const result = await db.connection.execute(
    "select * from accounts where id = ?",
    [id]
  );
  return result[0].length > 0 ? result[0] : null;
};

//get full name of user
exports.getFullName = async (id) => {
  const result = await db.connection.execute(
    "select fullname from accounts where id = ?",
    [id]
  );
  return result[0].length > 0 ? result[0] : null;
};

exports.updateUser = async (name, email, birthday, id) => {
  const result = await db.connection.execute(
    "update accounts set fullname=?,email=?,birthday=? where id=?",
    [name, email, birthday, id]
  );
  return result[0];
};

exports.setStudentId = async (id, idUser, idClass) => {
  const result = await db.connection.execute(
    "update enrollment set studentId=? where userId=? and classId=?",
    [id, idUser, idClass]
  );
  return result[0];
};

exports.getStudentIds = async () => {
  const result = await db.connection.execute(
    "select id, idstudent from studentId where iduser is NUll"
  );

  return result[0].length > 0 ? result[0] : null;
};

exports.getStudentId = async (id, classId) => {
  const result = await db.connection.execute(
    "select studentId from enrollment where userId = ? and classId = ?",
    [id, classId]
  );

  return result[0].length > 0 ? result[0] : null;
};

//update image in account
exports.updateImage = async (id, image) => {
  const result = await db.connection.execute(
    "update accounts set image=? where id=?",
    [image, id]
  );
  return result[0];
};
