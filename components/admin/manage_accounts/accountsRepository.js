const db = require("../../../db/index");

exports.getAllUsers = async (role) => {
  const result = await db.connection.execute(
    "select * from accounts where role=?", [role]
  );

  return result[0].length > 0 ? result[0] : null;
};

exports.getAllClasses = async () => {
  const result = await db.connection.execute(
    "select class.id, class.name, accounts.fullname as createdBy, class.title, class.topic, class.room, class.active from class inner join accounts where class.createdBy = accounts.id"
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

exports.activeClass = async (id, value) => {
  const result = await db.connection.execute(
    "update class set active=? where id=?",
    [value, id]
  );
  return result[0];
};

exports.getStudentIds = async () => {
  const result = await db.connection.execute(
    "select enrollment.id,enrollment.classId, accounts.fullname, enrollment.studentId  from enrollment inner join accounts where enrollment.userId=accounts.id and enrollment.role='student'"
    , []
  );

  return result[0].length > 0 ? result[0] : null;
};

exports.mapStudentId = async (id, studentId) => {
  const result = await db.connection.execute(
    "update enrollment set studentId=? where id=?", [studentId, id]
  );
 
  return result[0];
};

exports.mapListStudentId = async (listUserIds) => {
  console.log(listUserIds)
  for (const value of listUserIds) {
    const studentId = value.studentId;
    const id = value.id;
    console.log(studentId, id)
    try {
      await db.connection.execute(
        "UPDATE enrollment SET studentId=? WHERE id=?", [studentId, id]
      );
    } catch (error) {
      console.error('Lỗi trong quá trình cập nhật:', error.message);
      return null;
    }

  }
  return true;
};

