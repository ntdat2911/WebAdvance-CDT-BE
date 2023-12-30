const db = require("../../db/index");

exports.getUserByEmail = async (email) => {
  const result = await db.connection.execute(
    "select * from accounts where email like ? and sociallogin = ? limit 1",
    [email, "0"]
  );
  return result[0].length > 0 ? result[0] : null;
};

exports.phonenumberExists = async (phonenumber) => {
  const result = await db.connection.execute(
    "select phonenumber from accounts where phonenumber = ? limit 1",
    [phonenumber]
  );
  return result[0].length > 0;
};

exports.emailExists = async (email) => {
  const result = await db.connection.execute(
    "select email from accounts where email = ? and sociallogin = ? limit 1",
    [email, "0"]
  );
  return result[0].length > 0;
};

exports.isSocial = async (email) => {
  const social = "1";
  const result = await db.connection.execute(
    "select * from accounts where email = ? and sociallogin = ? limit 1",
    [email, social]
  );
  return result[0].length > 0;
};

exports.insertUser = async (fullname, email, hash) => {
  const result = await db.connection.execute(
    "insert into accounts (PASSWORD,FULLNAME, EMAIL, IMAGE, SOCIALLOGIN, ROLE, ACTIVE, VERIFIED) VALUES (?,?,?,?,?,?,?,?)",
    [hash, fullname, email, "default-user.png", "0", "user", 1, "0"]
  );
  return result[0];
};

exports.insertUserSocial = async (fullname, email, hash) => {
  const result = await db.connection.execute(
    "insert into accounts (PASSWORD,FULLNAME, EMAIL, IMAGE, SOCIALLOGIN, ROLE, ACTIVE, VERIFIED) VALUES (?,?,?,?,?,?,?,?)",
    [hash, fullname, email, "default-user.png", "1", "user", 1, "0"]
  );
  return result[0];
};
