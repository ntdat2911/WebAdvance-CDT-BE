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
  console.log(result[0]);
  return result[0];
};

exports.getStudentIds = async () => {
  const result = await db.connection.execute(
    "select id, idstudent from studentId where iduser = ?", [""]
  );

  return result[0].length > 0 ? result[0] : null;
};
