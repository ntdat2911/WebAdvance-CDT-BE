const db = require("../../db/index");
const moment = require('moment-timezone');

exports.getAClass = async (id) => {
  const result = await db.connection.execute(
    "select * from class where id = ?",
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
  room
) => {
  const result = await db.connection.execute(
    "insert into class (name,createdBy,description,title,topic,room,active) values (?,?,?,?,?,?,1)",
    [className, createdBy, description, title, topic, room]
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
    "SELECT enrollment.*, class.* FROM enrollment INNER JOIN class ON enrollment.classId = class.id WHERE enrollment.userId = ? AND enrollment.role = ?",
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
        'UPDATE grade SET score=? WHERE type = ? AND idUser = ?',
        [update.score, update.type, update.id]
      );
    }
    catch (error) {
      console.log(error)
    }
  }
  return true;
};

exports.updateGrades = async (data) => {
  for (const update of data) {
    try {
      await db.connection.execute(
        'UPDATE grade SET score=? WHERE type = ? AND idUser = ?',
        [update.score, update.type, update.index]
      );
    }
    catch (error) {
      console.log(error)
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

exports.addGradeStructure = async (idClass, percentage, value, orderValue, students) => {
  const result = await db.connection.execute(
    "INSERT INTO gradeStructure (IDCLASS,PERCENTAGE, VALUE, orderValue) VALUES (?,?,?,?)",
    [idClass, percentage, value, orderValue]
  );

  try {
    for(const stu of students){
      await db.connection.execute(
        "INSERT INTO grade (IDCLASS,type, idUser) VALUES (?,?,?)",
        [idClass, percentage, stu.userId]
      );
    }
  } catch (error) {
    console.log(error)
  }
  
  return result[0].length > 0 ? result[0] : null;
};

exports.updateRowGradeStructures = async (idClass, gradeStructure) => {
  try {
    for (const { percentage, value, id } of gradeStructure) {
      try {
        await db.connection.execute(
          'UPDATE gradeStructure SET orderValue=?,value = ? WHERE idClass = ? AND percentage = ?',
          [id, value,  idClass, percentage]
        );
      }
      catch (error) {
        console.log(error)
      }
    }
    return true;
  } catch (error) {
    console.error('Error updating grade structures:', error);
    return { success: false, error: 'Error updating grade structures' };
  }
};

exports.updateGradeStructure = async (idClass, gradeStructure) => {
  try {
    const result = await db.connection.execute(
      "UPDATE gradeStructure set percentage=?, value = ? WHERE idClass =? and orderValue = ?",
      [gradeStructure.percentage,gradeStructure.value, idClass, gradeStructure.id]
    );
    return result[0].length > 0 ? result[0] : null;
  }
  catch (error) {
    console.error('Error updating grade structures:', error);
  }
}

exports.finalGradeStructure = async (idClass, gradeStructure) => {
  try {
    const result = await db.connection.execute(
      "UPDATE gradeStructure set finalScore=? WHERE idClass =? and orderValue = ?",
      [gradeStructure.finalScore, idClass, gradeStructure.id]
    );
    return result[0].length > 0 ? result[0] : null;
  }
  catch (error) {
    console.error('Error updating grade structures:', error);
  }
}

exports.deleteGradeStructure = async (idClass, id, students, deletedValue) => {
  const result = await db.connection.execute(
    "DELETE FROM gradeStructure WHERE idClass=? and orderValue =?",
    [idClass, id]
  );

  try {
    for(const stu of students){
      await db.connection.execute(
        "DELETE FROM grade where idClass=? and idUser=? and type=?",
        [idClass, stu.userId, deletedValue]
      );
    }
  } catch (error) {
    console.log(error)
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

exports.addNotification = async (idClass, idUser, content) => {
  const result = await db.connection.execute(
    "INSERT INTO notifications (idClass,idUser, content) VALUES (?,?,?)",
    [idClass, idUser, content]
  );
}

exports.getNotifications = async (id) => {
  const result = await db.connection.execute(
    "SELECT * FROM notifications WHERE idUser = ? ORDER BY createdDay DESC LIMIT 5",
    [id]
  );
  console.log(result)

  const notifications = result[0].map(notification => {
    console.log(notification.createdDay)
    const localizedTimestamp = moment(notification.createdDay).tz('Asia/Ho_Chi_Minh');
    console.log(localizedTimestamp)
    return {
      ...notification,
      createdDay: localizedTimestamp.format(),
    };
  });

  return notifications.length > 0 ? notifications : null;
};