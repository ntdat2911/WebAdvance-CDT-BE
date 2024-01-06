const db = require("../../db/index");
const moment = require("moment-timezone");

exports.getAClass = async (id) => {
  const result = await db.connection.execute(
    "select * from class where id = ?",
    [id]
  );
  return result[0].length > 0 ? result[0] : null;
};

exports.getListStudentIds = async (id) => {
  const result = await db.connection.execute(
    "select * from enrollment where classId = ? and role='student'",
    [id]
  );
  return result[0].length > 0 ? result[0] : null;
};

exports.getParticipants = async (id) => {
  const result = await db.connection.execute(
    "select accounts.image, accounts.fullname, enrollment.role from enrollment JOIN accounts ON enrollment.userId = accounts.id where classId = ?",
    [id]
  );
  return result[0].length > 0 ? result[0] : null;
};

exports.insertAClass = async (
  className,
  createdBy,
  description,
  title,
  topic,
  room,
  code
) => {
  const result = await db.connection.execute(
    "insert into class (name,createdBy,description,title,topic,room,active,inviteCode) values (?,?,?,?,?,?,1,?)",
    [className, createdBy, description, title, topic, room, code]
  );
  return result[0].insertId;
};

exports.updateAClass = async (
  classId,
  className,
  description,
  title,
  topic,
  room
) => {
  const result = await db.connection.execute(
    "update class set name=?,description=?,title=?,topic=?,room=? where id=?",
    [className, description, title, topic, room, classId]
  );
  return result[0];
};

exports.updateActive = async (id, status) => {
  const result = await db.connection.execute(
    "update class set active= ? where id=?",
    [status, id]
  );
  return result[0];
};

exports.getAllStudents = async (id) => {
  const result = await db.connection.execute(
    "SELECT enrollment.userId FROM enrollment INNER JOIN class ON enrollment.classId = class.id WHERE enrollment.classId = ? AND enrollment.role = ?",
    [id, "student"]
  );
  return result[0].length > 0 ? result[0] : null;
};

exports.getAllNameStudents = async (id) => {
  const result = await db.connection.execute(
    "SELECT accounts.fullname FROM enrollment INNER JOIN class ON enrollment.classId = class.id INNER JOIN accounts ON enrollment.userId = accounts.id WHERE enrollment.classId = ? AND enrollment.role = ?",
    [id, "student"]
  );
  return result[0].length > 0 ? result[0] : null;
};

exports.getStudentClass = async (id) => {
  const result = await db.connection.execute(
    "SELECT enrollment.*, class.* , a.image FROM enrollment INNER JOIN class ON enrollment.classId = class.id INNER JOIN accounts a ON a.id = class.createdBy WHERE enrollment.userId = ? AND enrollment.role = ?",
    [id, "student"]
  );
  return result[0].length > 0 ? result[0] : null;
};

exports.getTeacherClass = async (id) => {
  try {
    const result = await db.connection.execute(
      "SELECT enrollment.*, class.* FROM enrollment INNER JOIN class ON enrollment.classId = class.id WHERE enrollment.userId = ? AND enrollment.role = ?",
      [id, "teacher"]
    );
    return result[0].length > 0 ? result[0] : null;
  } catch (error) {
    console.log(error);
  }
};

exports.getStudentIds = async (id) => {
  const result = await db.connection.execute(
    "select enrollment.id, accounts.fullname, enrollment.studentId from enrollment inner join accounts where enrollment.userId = accounts.id and enrollment.role='student' and  enrollment.classId=?",
    [id]
  );
  return result[0];
};

exports.getLengthGrades = async (idClass) => {
  const result = await db.connection.execute(
    "SELECT * from grade where idClass = ?",
    [idClass]
  );
  return result[0].length > 0 ? result[0] : null;
};

exports.getGrades = async (idClass) => {
  const result = await db.connection.execute(
    "SELECT enrollment.userId, enrollment.classId, accounts.fullname, gradeStructure.percentage, grade.score FROM enrollment JOIN accounts ON enrollment.userId = accounts.id JOIN gradeStructure ON enrollment.classId = gradeStructure.idClass LEFT JOIN grade ON enrollment.userId = grade.idUser AND enrollment.classId = grade.idClass AND grade.type = gradeStructure.percentage WHERE enrollment.classId = ? AND enrollment.role = 'student'",
    [idClass]
  );
  return result[0].length > 0 ? result[0] : null;
};

exports.updateGrade = async (data) => {
  for (const update of data) {
    try {
      await db.connection.execute(
        "UPDATE grade SET score=? WHERE type = ? AND idUser = ?",
        [update.score, update.type, update.id]
      );
    } catch (error) {
      console.log(error);
    }
  }
  return true;
};

exports.updateGrades = async (data) => {
  for (const update of data) {
    try {
      await db.connection.execute(
        "UPDATE grade SET score=? WHERE type = ? AND idUser = ?",
        [update.score, update.type, update.index]
      );
    } catch (error) {
      console.log(error);
    }
  }
  return true;
};

exports.updateStudentId = async (data, id) => {
  try {
    await db.connection.execute(
      "UPDATE enrollment SET studentId=? WHERE id = ?",
      [id, data.id]
    );
  } catch (error) {
    console.log(error);
  }
};

exports.updateStudentIds = async (data) => {
  for (const update of data) {
    try {
      await db.connection.execute(
        "UPDATE enrollment SET studentId=? WHERE id = ?",
        [update.studentId, update.id]
      );
    } catch (error) {
      console.log(error);
    }
  }
  return true;
};

exports.getGradeStructures = async (id) => {
  const result = await db.connection.execute(
    "SELECT * from gradeStructure where idClass = ?",
    [id]
  );
  return result[0].length > 0 ? result[0] : null;
};

exports.addGradeStructure = async (
  idClass,
  percentage,
  value,
  orderValue,
  students
) => {
  const result = await db.connection.execute(
    "INSERT INTO gradeStructure (IDCLASS,PERCENTAGE, VALUE, orderValue) VALUES (?,?,?,?)",
    [idClass, percentage, value, orderValue]
  );

  try {
    for (const stu of students) {
      await db.connection.execute(
        "INSERT INTO grade (IDCLASS,type, idUser) VALUES (?,?,?)",
        [idClass, percentage, stu.userId]
      );
    }
  } catch (error) {
    console.log(error);
  }

  return result[0].length > 0 ? result[0] : null;
};

exports.updateRowGradeStructures = async (idClass, gradeStructure) => {
  try {
    for (const { percentage, value, id } of gradeStructure) {
      try {
        await db.connection.execute(
          "UPDATE gradeStructure SET orderValue=?,value = ? WHERE idClass = ? AND percentage = ?",
          [id, value, idClass, percentage]
        );
      } catch (error) {
        console.log(error);
      }
    }
    return true;
  } catch (error) {
    console.error("Error updating grade structures:", error);
    return { success: false, error: "Error updating grade structures" };
  }
};

exports.updateGradeStructure = async (idClass, gradeStructure) => {
  try {
    const result = await db.connection.execute(
      "UPDATE gradeStructure set percentage=?, value = ? WHERE idClass =? and orderValue = ?",
      [
        gradeStructure.percentage,
        gradeStructure.value,
        idClass,
        gradeStructure.id,
      ]
    );
    return result[0].length > 0 ? result[0] : null;
  } catch (error) {
    console.error("Error updating grade structures:", error);
  }
};

exports.finalGradeStructure = async (idClass, gradeStructure) => {
  try {
    const result = await db.connection.execute(
      "UPDATE gradeStructure set finalScore=? WHERE idClass =? and orderValue = ?",
      [gradeStructure.finalScore, idClass, gradeStructure.id]
    );
    return result[0].length > 0 ? result[0] : null;
  } catch (error) {
    console.error("Error updating grade structures:", error);
  }
};

exports.deleteGradeStructure = async (idClass, id, students, deletedValue) => {
  const result = await db.connection.execute(
    "DELETE FROM gradeStructure WHERE idClass=? and orderValue =?",
    [idClass, id]
  );

  try {
    for (const stu of students) {
      await db.connection.execute(
        "DELETE FROM grade where idClass=? and idUser=? and type=?",
        [idClass, stu.userId, deletedValue]
      );
    }
  } catch (error) {
    console.log(error);
  }

  return result[0].length > 0 ? result[0] : null;
};

exports.getGradesStudent = async (idClass, idUser) => {
  const result = await db.connection.execute(
    "SELECT enrollment.userId, enrollment.classId, accounts.fullname, gradeStructure.percentage, grade.score FROM enrollment JOIN accounts ON enrollment.userId = accounts.id JOIN gradeStructure ON enrollment.classId = gradeStructure.idClass LEFT JOIN grade ON enrollment.userId = grade.idUser AND enrollment.classId = grade.idClass AND grade.type = gradeStructure.percentage WHERE enrollment.classId = ? AND enrollment.role = 'student' AND enrollment.userId=?",
    [idClass, idUser]
  );
  return result[0].length > 0 ? result[0] : null;
};

exports.getGradeStructuresStudent = async (id) => {
  const result = await db.connection.execute(
    "SELECT * from gradeStructure where idClass = ? and finalScore=1",
    [id]
  );
  return result[0].length > 0 ? result[0] : null;
};

exports.addClassNotification = async (idClass, idUser, content, url) => {
  for (const id of idUser) {
    try {
      await db.connection.execute(
        "INSERT INTO notifications (sender,receiver, content, url, type) VALUES (?,?,?,?,?)",
        [idClass, id.userId, content, url, "class"]
      );
    } catch (error) {
      return false;
    }
  }
  return true;
};

exports.addUserNotification = async (idClass, idUser, content, url) => {
  for (const id of idUser) {
    try {
      await db.connection.execute(
        "INSERT INTO notifications (sender,receiver, content, url, type) VALUES (?,?,?,?,?)",
        [idClass, id.userId, content, url, "user"]
      );
    } catch (error) {
      return false;
    }
  }
  return true;
};

exports.getNotifications = async (id) => {
  const result = await db.connection.execute(
    "SELECT notifications.*, accounts.fullname, class.name, CASE WHEN notifications.type = 'class' THEN class.id WHEN notifications.type = 'user' THEN accounts.id ELSE NULL END AS additionalId FROM notifications LEFT JOIN class ON notifications.type = 'class' AND class.id = notifications.sender LEFT JOIN accounts ON notifications.type = 'user' AND accounts.id = notifications.receiver WHERE notifications.receiver = ? ORDER BY notifications.createdDay DESC LIMIT 5",
    [id]
  );

  const notifications = result[0].map((notification) => {
    const localizedTimestamp = moment(notification.createdDay).tz(
      "Asia/Ho_Chi_Minh"
    );
    return {
      ...notification,
      createdDay: localizedTimestamp.format(),
    };
  });

  return notifications.length > 0 ? notifications : null;
};

exports.setReadNotifications = async (notifications) => {
  for (const noti of notifications) {
    try {
      await db.connection.execute(
        "UPDATE notifications SET marked=1 where id=?",
        [noti.id]
      );
    } catch (error) {
      console.log(error);
    }
  }
  return true;
};
// get invite code
exports.getInviteCode = async (id) => {
  const result = await db.connection.execute(
    "SELECT inviteCode FROM class WHERE id = ?",
    [id]
  );
  return result[0].length > 0 ? result[0] : null;
};

// update invite code
exports.updateInviteCode = async (id, code) => {
  const result = await db.connection.execute(
    "UPDATE class SET inviteCode = ? WHERE id = ?",
    [code, id]
  );
  return result[0].length > 0 ? result[0] : null;
};

//check exist code invite
exports.checkExistCode = async (code) => {
  const result = await db.connection.execute(
    "SELECT * FROM class WHERE inviteCode = ?",
    [code]
  );
  return result[0].length > 0 ? true : false;
};
//get class infomation by code but except active
exports.getClassByCode = async (code) => {
  const result = await db.connection.execute(
    "SELECT id,name,createdBy,title,topic,room,description FROM class WHERE inviteCode = ?",
    [code]
  );
  return result[0].length > 0 ? result[0] : null;
};

//get class created by user
exports.getInfoTeacherOfClass = async (id) => {
  const result = await db.connection.execute(
    "SELECT a.image FROM class c join accounts a on a.id = c.createdBy WHERE createdBy = ? LIMIT 1",
    [id]
  );
  return result[0].length > 0 ? result[0] : null;
};

//check user in class by email
exports.checkUserInClass = async (email, id) => {
  const result = await db.connection.execute(
    "SELECT * FROM enrollment e JOIN accounts a ON e.userId = a.id WHERE a.email = ? AND e.classId = ?",
    [email, id]
  );
  return result[0].length > 0 ? true : false;
};
