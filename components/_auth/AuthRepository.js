const db = require("../../db/index");
const defaultImage =
  "https://res.cloudinary.com/dmbwhnml9/image/upload/v1704211985/jumqy1dsog174zoi5ksx.png";
exports.getUserByEmail = async (email, social) => {
  const result = await db.connection.execute(
    "select * from accounts where email like ? and sociallogin = ? limit 1",
    [email, social]
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
    "select id, email, fullname, birthday from accounts where email = ? and sociallogin = ? limit 1",
    [email, social]
  );
  console.log(result[0], " res 0");
  return result[0].length > 0 ? result[0] : false;
};

exports.insertUser = async (fullname, email, hash) => {
  const result = await db.connection.execute(
    "insert into accounts (PASSWORD,FULLNAME, EMAIL, SOCIALLOGIN, ROLE, ACTIVE, VERIFIED,IMAGE) VALUES (?,?,?,?,?,?,?,?)",
    [hash, fullname, email, "0", "user", 1, "0", defaultImage]
  );
  return result[0];
};

exports.insertUserSocial = async (fullname, email, hash) => {
  const result = await db.connection.execute(
    "insert into accounts (PASSWORD,FULLNAME, EMAIL, SOCIALLOGIN, ROLE, ACTIVE, VERIFIED,IMAGE) VALUES (?,?,?,?,?,?,?,?)",
    [hash, fullname, email, "1", "user", 1, "0", defaultImage]
  );
  return result[0];
};
