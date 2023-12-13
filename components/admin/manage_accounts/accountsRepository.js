const db = require("../../../db/index");

exports.getAllUsers = async (role) => {
  const result = await db.connection.execute(
    "select * from accounts where role=?", [role]
  );

  return result[0].length > 0 ? result[0] : null;
};

exports.getAllClasses = async () => {
  const result = await db.connection.execute(
    "select * from class"
  );

  return result[0].length > 0 ? result[0] : null;
};

exports.updateUser = async (id, fullname, birthday) => {
  const result = await db.connection.execute(
    "update accounts set fullname=?,birthday=? where id=?",
    [fullname, birthday, id]
  );
  return result[0];
};

exports.banUser = async (email, active, sociallogin) => {
  const result = await db.connection.execute(
    "update accounts set email=?,active=?, sociallogin=? where email=?",
    [email, active, sociallogin, email]
  );
  return result[0];
};
