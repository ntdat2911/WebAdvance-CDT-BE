const classRepository = require("./ClassRepository");
const ShortUniqueId = require("short-unique-id");
const enrollmentService = require("./user_class/EnrollmentService");
const userService = require("../users/UserService");
const e = require("express");
exports.getAClass = async (id) => {
  return await classRepository.getAClass(id);
};

exports.getListStudentIds = async (id) => {
  return await classRepository.getListStudentIds(id);
};

exports.getParticipants = async (id) => {
  const result = await classRepository.getParticipants(id);
  return result;
};

exports.insertAClass = async (
  className,
  createdBy,
  description,
  title,
  topic,
  room
) => {
  const { randomUUID } = new ShortUniqueId({ length: 10 });
  const code = randomUUID();
  return await classRepository.insertAClass(
    className,
    createdBy,
    description,
    title,
    topic,
    room,
    code
  );
};

exports.updateAClass = async (
  classId,
  className,
  description,
  title,
  topic,
  room
) => {
  return await classRepository.updateAClass(
    classId,
    className,
    description,
    title,
    topic,
    room
  );
};

exports.getAllStudents = async (id) => {
  return await classRepository.getAllStudents(id);
};

exports.getStudentClass = async (id) => {
  return await classRepository.getStudentClass(id);
};

exports.getTeacherClass = async (id) => {
  return await classRepository.getTeacherClass(id);
};

exports.updateActive = async (id, status) => {
  return await classRepository.updateActive(id, status);
};

exports.getStudentIds = async (id) => {
  return await classRepository.getStudentIds(id);
};

exports.getGrades = async (id) => {
  const lengthGrade = await classRepository.getLengthGrades(id);

  if (lengthGrade == null) {
    const tmp = await classRepository.getAllNameStudents(id);
    if (tmp == null) return [];
    tmp.forEach((item, id) => {
      item.id = id + 1;
    });
    const final = tmp.map((obj) => {
      let { id, ...rest } = obj;
      return { id, ...rest };
    });

    return final;
  }
  const result = await classRepository.getGrades(id);
  const result2 = await classRepository.getGradeStructures(id);

  const array = result2.map((item) => ({
    id: item.orderValue,
    percentage: item.percentage,
  }));
  array.sort((a, b) => a.id - b.id);
  const structure = array.map((item) => item.percentage);
  const groupedData = {};
  result.forEach((item) => {
    const userId = item.userId;

    if (!groupedData[userId]) {
      groupedData[userId] = {
        userId: item.userId,
        classId: item.classId,
        fullname: item.fullname,
        index: item.userId,
      };
    }

    groupedData[userId][item.percentage] = item.score;
  });

  const finalResult = Object.values(groupedData);

  //add Id
  finalResult.forEach((item, id) => {
    item.id = id + 1;
  });
  //transfer to head
  const final = finalResult.map((obj) => {
    let { id, ...rest } = obj;
    return { id, ...rest };
  });
  const tmp = final.map(({ userId, classId, ...rest }) => rest);

  const reorderColumns = (obj, order) => {
    const orderedObj = { id: obj.id, fullname: obj.fullname, index: obj.index };
    order.forEach((key) => {
      if (obj.hasOwnProperty(key)) {
        orderedObj[key] = obj[key];
      }
    });

    return orderedObj;
  };

  // Reorder columns for each object in the array
  const newData = tmp.map((item) => reorderColumns(item, structure));

  return newData;
};

exports.updateGrade = async (data) => {
  const result = await classRepository.updateGrade(data);
  return result;
};

exports.updateGrades = async (data) => {
  const result = await classRepository.updateGrades(data);
  return result;
};

exports.updateStudentId = async (data, id) => {
  const result = await classRepository.updateStudentId(data, id);
  return result;
};

exports.updateStudentIds = async (data) => {
  const result = await classRepository.updateStudentIds(data);
  return result;
};

exports.getGradeStructures = async (id) => {
  const result = await classRepository.getGradeStructures(id);

  if (result === null) {
    return [];
  }
  const array = result.map((item) => ({
    id: item.orderValue,
    percentage: item.percentage,
    value: item.value,
    finalScore: item.finalScore,
  }));
  array.sort((a, b) => a.id - b.id);
  return array;
};

exports.addGradeStructure = async (
  idClass,
  percentage,
  value,
  orderValue,
  students
) => {
  const result = await classRepository.addGradeStructure(
    idClass,
    percentage,
    value,
    orderValue,
    students
  );
  return result;
};

exports.updateRowGradeStructures = async (idClass, gradeStructure) => {
  const result = await classRepository.updateRowGradeStructures(
    idClass,
    gradeStructure
  );
  return result;
};

exports.updateGradeStructure = async (idClass, gradeStructure) => {
  const result = await classRepository.updateGradeStructure(
    idClass,
    gradeStructure
  );
  return result;
};

exports.finalGradeStructure = async (
  idClass,
  idUser,
  content,
  url,
  gradeStructure
) => {
  const result = await classRepository.finalGradeStructure(
    idClass,
    gradeStructure
  );

  if (gradeStructure.finalScore == 1)
    await classRepository.addClassNotification(idClass, idUser, content, url);
  return result;
};

exports.deleteGradeStructure = async (
  idClass,
  gradeStructure,
  id,
  students,
  deletedValue
) => {
  const result = await classRepository.deleteGradeStructure(
    idClass,
    id,
    students,
    deletedValue
  );
  await classRepository.updateRowGradeStructures(idClass, gradeStructure);
  return result;
};

exports.getGradesStudent = async (id, idUser) => {
  const lengthGrade = await classRepository.getLengthGrades(id);

  if (lengthGrade == null) {
    return [];
  }
  const result = await classRepository.getGradesStudent(id, idUser);
  const result2 = await classRepository.getGradeStructuresStudent(id);

  const array = result2.map((item) => ({
    id: item.orderValue,
    percentage: item.percentage,
  }));
  array.sort((a, b) => a.id - b.id);
  const structure = array.map((item) => item.percentage);
  const groupedData = {};
  result.forEach((item) => {
    const userId = item.userId;

    if (!groupedData[userId]) {
      groupedData[userId] = {
        userId: item.userId,
        classId: item.classId,
        fullname: item.fullname,
        index: item.userId,
      };
    }

    groupedData[userId][item.percentage] = item.score;
  });

  const finalResult = Object.values(groupedData);

  //add Id
  finalResult.forEach((item, id) => {
    item.id = id + 1;
  });
  //transfer to head
  const final = finalResult.map((obj) => {
    let { id, ...rest } = obj;
    return { id, ...rest };
  });
  const tmp = final.map(({ userId, classId, ...rest }) => rest);

  const reorderColumns = (obj, order) => {
    const orderedObj = { id: obj.id, fullname: obj.fullname, index: obj.index };
    order.forEach((key) => {
      if (obj.hasOwnProperty(key)) {
        orderedObj[key] = obj[key];
      }
    });

    return orderedObj;
  };

  // Reorder columns for each object in the array
  const newData = tmp.map((item) => reorderColumns(item, structure));

  return newData;
};

exports.getGradeStructuresStudent = async (id) => {
  return await classRepository.getGradeStructuresStudent(id);
};

exports.getNotifications = async (id) => {
  return await classRepository.getNotifications(id);
};

exports.setReadNotifications = async (notifications) => {
  return await classRepository.setReadNotifications(notifications);
};
// get invite code
exports.getInviteCode = async (id) => {
  return await classRepository.getInviteCode(id);
};

// update invite code
exports.resetInviteCode = async (id) => {
  const { randomUUID } = new ShortUniqueId({ length: 10 });
  const code = randomUUID();
  return await classRepository.updateInviteCode(id, code);
};

//get class infomation by code, use the id to count number of students and teachers in enrollment table, then use teacherId to get teacher's name
exports.getClassByCode = async (code) => {
  const result = await classRepository.getClassByCode(code);
  if (result == null) return null;
  const classId = result[0].id;
  const countStudent = await enrollmentService.countStudent(classId);
  const countTeacher = await enrollmentService.countTeacher(classId);

  return {
    ...result,
    countStudent: countStudent,
    countTeacher: countTeacher,
  };
};

//get class created by user
exports.getInfoTeacherOfClass = async (id) => {
  const result = await classRepository.getInfoTeacherOfClass(id);
  return result;
};

//check user in class by email
exports.checkUserInClass = async (email, id) => {
  const result = await classRepository.checkUserInClass(email, id);
  return result;
};

//insert grade
exports.insertGrade = async (idUser, idClass, type) => {
  const result = await classRepository.insertGrade(idUser, idClass, type);
  return result;
};

//get grade by idUser and idClass and type
exports.getGradeByIdUserAndIdClassAndType = async (idUser, idClass, type) => {
  const result = await classRepository.getGradeByIdUserAndIdClassAndType(
    idUser,
    idClass,
    type
  );
  return result;
};

//insert review grade
exports.insertReviewGrade = async (
  enrollmentId,
  selectGradeId,
  expectedGrade,
  explanation,
  userId,
  url
) => {
  const result = await classRepository.insertReviewGrade(
    enrollmentId,
    selectGradeId,
    expectedGrade,
    explanation
  );
  const reviewGradeId = result.insertId;
  url = url + reviewGradeId;
  const toId = await classRepository.getTeacherIdByReviewGradeId(reviewGradeId);
  const fullname = await userService.getFullName(userId);
  const notiContent = `New request grade from ${fullname[0].fullname}`;
  await classRepository.addUserNotification(
    userId,
    toId[0].userId,
    notiContent,
    url
  );
  return result;
};

//get review grade by enrollmentId
exports.getReviewGrade = async (classId, userId) => {
  const enrollmentId = await enrollmentService.getIdByUserIdAndClassId(
    userId,
    classId
  );
  const result = await classRepository.getReviewGradeByEnrollmentId(
    enrollmentId
  );
  const getComments = async (result) => {
    for (const item of result) {
      const comment = await classRepository.getCommentByReviewGradeId(
        item.idReviewGrade
      );
      item.comments = comment;
    }
  };
  if (result === null) return null;
  await getComments(result);
  return result;
};

//getCommentByReviewGradeId
exports.getCommentByReviewGradeId = async (reviewGradeId) => {
  const result = await classRepository.getCommentByReviewGradeId(reviewGradeId);
  return result;
};
//insert comment
exports.insertComment = async (reviewGradeId, userId, content, role, url) => {
  const result = await classRepository.insertComment(
    reviewGradeId,
    userId,
    content
  );
  let toId;
  if (role === "teacher") {
    toId = await classRepository.getUserIdByReviewGradeId(reviewGradeId);
  } else if (role === "student") {
    toId = await classRepository.getTeacherIdByReviewGradeId(reviewGradeId);
  }
  const fullname = await userService.getFullName(userId);
  const notiContent = `You have a new comment from ${fullname[0].fullname}`;
  await classRepository.addUserNotification(
    userId,
    toId[0].userId,
    notiContent,
    url
  );
  return result;
};
//get review grade by idReviewGrade
exports.getReviewGradeByIdReviewGrade = async (idReviewGrade) => {
  const result = await classRepository.getReviewGradeByIdReviewGrade(
    idReviewGrade
  );
  return result;
};

//get review grade by classId
exports.getReviewGradeByClassId = async (classId) => {
  const result = await classRepository.getReviewGradeByClassId(classId);
  const getComments = async (result) => {
    for (const item of result) {
      const comment = await classRepository.getCommentByReviewGradeId(
        item.idReviewGrade
      );
      item.comments = comment;
    }
  };
  if (result === null) return null;
  await getComments(result);
  return result;
};

//getUserIdByReviewGradeId
exports.getUserIdByReviewGradeId = async (reviewGradeId) => {
  const result = await classRepository.getUserIdByReviewGradeId(reviewGradeId);
  return result;
};
//getTeacherIdByReviewGradeId
exports.getTeacherIdByReviewGradeId = async (reviewGradeId) => {
  const result = await classRepository.getTeacherIdByReviewGradeId(
    reviewGradeId
  );
  return result;
};
//updateGradeAndStatusOfReviewGrade
exports.updateGradeAndStatusOfReviewGrade = async (
  reviewGradeId,
  grade,
  status,
  userId,
  role,
  url
) => {
  const result = await classRepository.updateGradeAndStatusOfReviewGrade(
    reviewGradeId,
    grade,
    status
  );
  let toId;
  if (role === "teacher") {
    toId = await classRepository.getUserIdByReviewGradeId(reviewGradeId);
  } else if (role === "student") {
    toId = await classRepository.getTeacherIdByReviewGradeId(reviewGradeId);
  }
  const fullname = await userService.getFullName(userId);
  let notiContent;
  if (status === "done")
    notiContent = `Final grade from: ${fullname[0].fullname}`;
  else notiContent = `Updated grade: ${fullname[0].fullname}`;
  await classRepository.addUserNotification(
    userId,
    toId[0].userId,
    notiContent,
    url
  );
  return result;
};

//getRoleByReviewGradeId
exports.getRoleByReviewGradeId = async (reviewGradeId, userId) => {
  const result1 = await classRepository.checkTeacherInClassByReviewGradeId(
    reviewGradeId,
    userId
  );

  if (result1.length > 0) {
    return "teacher";
  }
  const result2 = await classRepository.checkUserInReviewGrade(
    reviewGradeId,
    userId
  );

  if (result2.length > 0) {
    return "student";
  }
  return null;
};
