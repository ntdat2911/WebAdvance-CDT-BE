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
      console.log(update);
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

exports.addUserNotification = async (fromUser, toUser, content, url) => {
  console.log(fromUser, toUser, content, url);
  try {
    await db.connection.execute(
      "INSERT INTO notifications (sender,receiver, content, url, type) VALUES (?,?,?,?,?)",
      [fromUser, toUser, content, url, "user"]
    );
  } catch (error) {
    return false;
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

//insert new grade
exports.insertGrade = async (idUser, idClass, type) => {
  const result = await db.connection.execute(
    "INSERT INTO grade (idUser, idClass, type) VALUES (?,?,?)",
    [idUser, idClass, type]
  );
  return result[0].length > 0 ? result[0] : null;
};

//get grade by idUser and idClass and type
exports.getGradeByIdUserAndIdClassAndType = async (idUser, idClass, type) => {
  const result = await db.connection.execute(
    "SELECT id FROM grade WHERE idUser = ? AND idClass = ? AND type = ?",
    [idUser, idClass, type]
  );

  return result[0].length > 0 ? result[0][0].id : null;
};

exports.insertReviewGrade = async (
  enrollmentId,
  selectGradeId,
  expectedGrade,
  explanation
) => {
  const result = await db.connection.execute(
    "insert into reviewGrade (enrollmentId,selectedGradeId,expectedGrade,explanation,status) values (?,?,?,?,?)",
    [enrollmentId, selectGradeId, expectedGrade, explanation, "pending"]
  );
  return result[0];
};

//get review grade by enrollmentId
exports.getReviewGradeByEnrollmentId = async (enrollmentId) => {
  const result = await db.connection.execute(
    "select rg.*,g.type from reviewGrade rg join grade g on g.id = rg.selectedGradeId where enrollmentId=?",
    [enrollmentId]
  );
  return result[0].length > 0 ? result[0] : null;
};
//get comment by reviewGradeId
exports.getCommentByReviewGradeId = async (reviewGradeId) => {
  const result = await db.connection.execute(
    "select rc.*,a.fullname,a.image from reviewComment rc join accounts a on rc.fromId = a.id where idReviewGrade=?",
    [reviewGradeId]
  );
  return result[0].length > 0 ? result[0] : null;
};
//insert comment
exports.insertComment = async (idReviewGrade, fromId, content) => {
  const result = await db.connection.execute(
    "insert into reviewComment (idReviewGrade,fromId,content) values (?,?,?)",
    [idReviewGrade, fromId, content]
  );
  return result[0];
};
//get review grade by idReviewGrade
exports.getReviewGradeByIdReviewGrade = async (idReviewGrade) => {
  const result = await db.connection.execute(
    "select rg.*,g.type,g.score from reviewGrade rg join grade g on rg.selectedGradeId = g.id  where idReviewGrade=?",
    [idReviewGrade]
  );
  return result[0].length > 0 ? result[0] : null;
};
//get review grade by classId
exports.getReviewGradeByClassId = async (classId) => {
  const result = await db.connection.execute(
    "select rg.*,g.type, a.fullname from reviewGrade rg join enrollment e on rg.enrollmentId = e.id join grade g on g.id = rg.selectedGradeId join accounts a on a.id = e.userId where e.classId=?",
    [classId]
  );
  return result[0].length > 0 ? result[0] : null;
};
//get userId by reviewGradeId
exports.getUserIdByReviewGradeId = async (reviewGradeId) => {
  const result = await db.connection.execute(
    "select e.userId from reviewGrade rg join enrollment e on rg.enrollmentId = e.id where idReviewGrade=?",
    [reviewGradeId]
  );
  return result[0].length > 0 ? result[0] : null;
};
//get teacher id by review grade id
exports.getTeacherIdByReviewGradeId = async (reviewGradeId) => {
  const result = await db.connection.execute(
    "select c.createdBy as userId from reviewGrade rg join enrollment e on rg.enrollmentId = e.id join class c on c.id = e.classId where idReviewGrade=?",
    [reviewGradeId]
  );
  return result[0].length > 0 ? result[0] : null;
};
//update grade and status of review grade
exports.updateGradeAndStatusOfReviewGrade = async (
  reviewGradeId,
  grade,
  status
) => {
  const result = await db.connection.execute(
    "update reviewGrade set grade=?,status=? where idReviewGrade=?",
    [grade, status, reviewGradeId]
  );
  return result[0];
};
//check if user in review grade
exports.checkUserInReviewGrade = async (reviewGradeId, userId) => {
  const result = await db.connection.execute(
    "select e.role from reviewGrade rg join enrollment e on rg.enrollmentId = e.id where rg.idReviewGrade=? and e.userId=?",
    [reviewGradeId, userId]
  );
  return result[0].length > 0 ? result[0] : false;
};
//check if teacher in class by reviewGradeId
exports.checkTeacherInClassByReviewGradeId = async (reviewGradeId, userId) => {
  const result = await db.connection.execute(
    "select e.role from reviewGrade rg join enrollment e on rg.enrollmentId = e.id join class c on c.id = e.classId where idReviewGrade=? and c.createdBy=?",
    [reviewGradeId, userId]
  );
  return result[0].length > 0 ? result[0] : false;
};
