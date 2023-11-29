const db = require("../../../db/index");

exports.getAllUsers = async (role) => {
  const result = await db.connection.execute(
    "select * from accounts where role = ?",
    [role]
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
