const db = require("../../db/index");

exports.getUser = async (id) => {
  const result = await db.connection.execute(
    "select * from accounts where id = ?",
    [id]
  );
  return result[0].length > 0 ? result[0] : null;
};

exports.updateUser = async (name, email, image, id) => {
  const result = await db.connection.execute(
    "update accounts set fullname=?,email=?,image=? where id=?",
    [name, email, image, id]
  );
  return result[0];
};

exports.setStudentId = async (id, idUser) => {
  const result = await db.connection.execute(
    "update studentId set idUser=? where id=?",
    [idUser, id]
  );
  return result[0];
};

exports.getStudentIds = async () => {
  const result = await db.connection.execute(
    "select id, idstudent from studentId where iduser is NUll"
  );

  return result[0].length > 0 ? result[0] : null;
};

exports.getStudentId = async (id) => {
  const result = await db.connection.execute(
    "select idstudent from studentId where iduser = ?",
    [id]
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
