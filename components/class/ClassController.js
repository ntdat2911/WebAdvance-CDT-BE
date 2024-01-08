const classService = require("./ClassService");

exports.getAClass = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await classService.getAClass(id);

    res.json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getListStudentIds = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await classService.getListStudentIds(id);

    res.json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getParticipants = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await classService.getParticipants(id);

    res.json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.insertAClass = async (req, res) => {
  try {
    const { className, createdBy, description, title, topic, room } = req.body;
    const insertId = await classService.insertAClass(
      className,
      createdBy,
      description,
      title,
      topic,
      room
    );
    res.status(200).json({ insertId });
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.updateAClass = async (req, res) => {
  try {
    const { classId, className, description, title, topic, room } = req.body;
    const respone = await classService.updateAClass(
      classId,
      className,
      description,
      title,
      topic,
      room
    );
    res.status(200).json("Success");
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getStudentClass = async (req, res) => {
  try {
    const { id } = req.body;
    const user = await classService.getStudentClass(id);
    res.json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getTeacherClass = async (req, res) => {
  try {
    const { id } = req.body;
    const user = await classService.getTeacherClass(id);
    res.json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getGrades = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await classService.getGrades(id);
    res.json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getStudentIds = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await classService.getStudentIds(id);
    res.json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.updateGrade = async (req, res) => {
  try {
    const { data } = req.body;
    const filteredData = Object.keys(data).reduce((acc, key) => {
      if (
        key !== "id" &&
        key !== "fullname" &&
        key !== "index" &&
        key !== "sum"
      ) {
        acc[key] = data[key];
      }
      return acc;
    }, {});

    const transformedArray = [filteredData];
    const id = data.index; // Chọn id cần cập nhật

    const updates = Object.keys(transformedArray[0]).map((key) => ({
      score: transformedArray[0][key],
      type: key,
      id: id,
    }));

    const finalArray = updates.map((item) => ({
      ...item,
      score: item.score === "" ? null : item.score,
    }));
    console.log(finalArray);
    const user = await classService.updateGrade(finalArray);
    res.json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.updateGrades = async (req, res) => {
  try {
    const { data } = req.body;
    const transformedArray = data.reduce((acc, item) => {
      const keys = Object.keys(item);

      keys.forEach((key) => {
        if (
          key !== "id" &&
          key !== "fullname" &&
          key !== "index" &&
          key !== "sum"
        ) {
          acc.push({
            score: item[key],
            type: key,
            index: item.index,
          });
        }
      });

      return acc;
    }, []);

    const user = await classService.updateGrades(transformedArray);
    res.json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.updateStudentId = async (req, res) => {
  try {
    const { data, studentId } = req.body;
    const user = await classService.updateStudentId(data, studentId);
    res.json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.updateStudentIds = async (req, res) => {
  try {
    const { data } = req.body;
    const user = await classService.updateStudentIds(data);
    console.log(JSON.stringify(user));
    res.json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getGradeStructures = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const user = await classService.getGradeStructures(id);
    console.log(JSON.stringify(user));
    res.json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.addGradeStructure = async (req, res) => {
  try {
    const { idClass, percentage, value, orderValue } = req.body;
    const students = await classService.getAllStudents(idClass);

    const user = await classService.addGradeStructure(
      idClass,
      percentage,
      value,
      orderValue,
      students
    );
    res.json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.updateRowGradeStructures = async (req, res) => {
  try {
    const { idClass, gradeStructure } = req.body;
    gradeStructure.sort((a, b) => a.id - b.id);

    const user = await classService.updateRowGradeStructures(
      idClass,
      gradeStructure
    );
    res.json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.updateGradeStructure = async (req, res) => {
  try {
    const { idClass, gradeStructure } = req.body;
    console.log(gradeStructure);
    const user = await classService.updateGradeStructure(
      idClass,
      gradeStructure
    );
    res.json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.finalGradeStructure = async (req, res) => {
  try {
    const { idClass, url, gradeStructure } = req.body;
    const content = "You have new score";
    const idUser = await classService.getAllStudents(idClass);
    const user = await classService.finalGradeStructure(
      idClass,
      idUser,
      content,
      url,
      gradeStructure
    );
    res.json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.deleteGradeStructure = async (req, res) => {
  try {
    const { idClass, id, gradeStructure, deletedValue } = req.body;

    const students = await classService.getAllStudents(idClass);
    const user = await classService.deleteGradeStructure(
      idClass,
      gradeStructure,
      id,
      students,
      deletedValue
    );
    res.json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getGradesStudent = async (req, res) => {
  try {
    const { idClass, idUser } = req.body;
    const user = await classService.getGradesStudent(idClass, idUser);
    res.json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getGradeStructuresStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await classService.getGradeStructuresStudent(id);
    res.json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getNotifications = async (req, res) => {
  try {
    const { idUser } = req.body;
    const user = await classService.getNotifications(idUser);
    res.json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.setReadNotifications = async (req, res) => {
  try {
    const { notifications } = req.body;
    const user = await classService.setReadNotifications(notifications);
    res.json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

//get invite code
exports.getInviteCode = async (req, res) => {
  try {
    const { id } = req.body;
    const code = await classService.getInviteCode(id);
    res.json(code);
  } catch (error) {
    res.status(500).json(error);
  }
};

//update invite code
exports.resetInviteCode = async (req, res) => {
  try {
    const { classId } = req.body;
    //use random uid to generate code invite
    const result = await classService.resetInviteCode(classId);
    res.json(result);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};

//get class info by invite code
exports.getClassByCode = async (req, res) => {
  try {
    const { code } = req.body;
    const result = await classService.getClassByCode(code);
    res.json(result);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};
//get info teacher of class
exports.getInfoTeacherOfClass = async (req, res) => {
  try {
    const { id } = req.body;
    const result = await classService.getInfoTeacherOfClass(id);
    res.json(result);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};

//check user in class by email
exports.checkUserInClass = async (req, res) => {
  try {
    const { email, classId } = req.body;
    const result = await classService.checkUserInClass(email, classId);
    res.json(result);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};
//get grade by idUser and idClass and type
exports.getAGrade = async (req, res) => {
  try {
    const { userId, classId, type } = req.body;

    const result = await classService.getGradeByIdUserAndIdClassAndType(
      userId,
      classId,
      type
    );
    res.json(result);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};

//insert review grade
exports.insertReviewGrade = async (req, res) => {
  try {
    const {
      enrollmentId,
      selectGradeId,
      expectedGrade,
      explanation,
      userId,
      url,
    } = req.body;
    const result = await classService.insertReviewGrade(
      enrollmentId,
      selectGradeId,
      expectedGrade,
      explanation,
      userId,
      url
    );
    res.json(result);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};

//get review grade by classId and userId
exports.getReviewGrade = async (req, res) => {
  try {
    const { classId, userId } = req.body;
    const result = await classService.getReviewGrade(classId, userId);
    if (result) {
      result.forEach((element) => {
        const dateString = element.createdDate;
        element.createdDate = new Date(dateString).toLocaleString();
      });
    }
    res.json(result);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};

//getCommentByReviewGradeId
exports.getCommentByReviewGradeId = async (req, res) => {
  try {
    const { reviewGradeId } = req.body;
    const result = await classService.getCommentByReviewGradeId(reviewGradeId);
    if (result) {
      result.forEach((element) => {
        if (element.createdDate) {
          const dateString = element.createdDate;
          element.createdDate = new Date(dateString).toLocaleString();
        }
      });
    }
    res.json(result);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};

//insert comment
exports.insertComment = async (req, res) => {
  try {
    const { reviewGradeId, userId, content, role, url } = req.body;
    const result = await classService.insertComment(
      reviewGradeId,
      userId,
      content,
      role,
      url
    );
    res.json(result);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};
//get review grade by idReviewGrade
exports.getReviewGradeById = async (req, res) => {
  try {
    const { idReviewGrade } = req.body;
    const result = await classService.getReviewGradeByIdReviewGrade(
      idReviewGrade
    );
    res.json(result);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};

//get review grade by classId
exports.getReviewGradeByClassId = async (req, res) => {
  try {
    const { classId } = req.body;
    const result = await classService.getReviewGradeByClassId(classId);
    if (result) {
      result.forEach((element) => {
        if (element.createdDate) {
          const dateString = element.createdDate;
          element.createdDate = new Date(dateString).toLocaleString();
        }
      });
    }
    res.json(result);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};

//getUserIdByReviewGradeId
exports.getUserIdByReviewGradeId = async (req, res) => {
  try {
    const { reviewGradeId } = req.body;
    const result = await classService.getUserIdByReviewGradeId(reviewGradeId);
    res.json(result);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};
//getTeacherIdByReviewGradeId
exports.getTeacherIdByReviewGradeId = async (req, res) => {
  try {
    const { reviewGradeId } = req.body;
    const result = await classService.getTeacherIdByReviewGradeId(
      reviewGradeId
    );
    res.json(result);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};
//updateGradeAndStatusOfReviewGrade
exports.updateGradeAndStatusOfReviewGrade = async (req, res) => {
  try {
    const { reviewGradeId, grade, status, userId, role, url } = req.body;
    const result = await classService.updateGradeAndStatusOfReviewGrade(
      reviewGradeId,
      grade,
      status,
      userId,
      role,
      url
    );
    res.json(result);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};
//get role by reviewGradeId
exports.getRoleByReviewGradeId = async (req, res) => {
  try {
    const { reviewGradeId, userId } = req.body;
    const result = await classService.getRoleByReviewGradeId(
      reviewGradeId,
      userId
    );
    res.json(result);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};
