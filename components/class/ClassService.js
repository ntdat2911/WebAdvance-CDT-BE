const classRepository = require("./ClassRepository");

exports.getAClass = async (id) => {
  return await classRepository.getAClass(id);
};

exports.insertAClass = async (
  className,
  createdBy,
  description,
  title,
  topic,
  room
) => {
  return await classRepository.insertAClass(
    className,
    createdBy,
    description,
    title,
    topic,
    room
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

exports.getGrades = async (id) => {
  const lengthGrade = await classRepository.getLengthGrades(id);

  if (lengthGrade == null) {
    const tmp = await classRepository.getAllNameStudents(id);
    tmp.forEach((item, id) => {
      item.id = id + 1;
    });
    const final = tmp.map(obj => {
      let { id, ...rest } = obj;
      return { id, ...rest };
    });

    return final
  }
  const result = await classRepository.getGrades(id);
  const result2 = await classRepository.getGradeStructures(id);

  const array = result2.map(item => ({ id: item.orderValue, percentage: item.percentage }));
  array.sort((a, b) => a.id - b.id);
  const structure = array.map(item => item.percentage);
  const groupedData = {};
  result.forEach(item => {
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
  const final = finalResult.map(obj => {
    let { id, ...rest } = obj;
    return { id, ...rest };
  });
  const tmp = final.map(({ userId, classId, ...rest }) => rest);

  const reorderColumns = (obj, order) => {
    const orderedObj = { id: obj.id, fullname: obj.fullname, index: obj.index };
    order.forEach(key => {
      if (obj.hasOwnProperty(key)) {
        orderedObj[key] = obj[key];
      }
    });

    return orderedObj;
  };

  // Reorder columns for each object in the array
  const newData = tmp.map(item => reorderColumns(item, structure));

  return newData;
};

exports.updateGrade = async (data) => {
  const result = await classRepository.updateGrade(data);
  return result;
}

exports.updateGrades = async (data) => {
  const result = await classRepository.updateGrades(data);
  return result;
}

exports.getGradeStructures = async (id) => {
  const result = await classRepository.getGradeStructures(id);

  if (result === null) {
    return []
  }
  const array = result.map(item => ({ id: item.orderValue, percentage: item.percentage, value: item.value, finalScore: item.finalScore }));
  array.sort((a, b) => a.id - b.id);
  return array;
};

exports.addGradeStructure = async (idClass, percentage, value, orderValue, students) => {
  const result = await classRepository.addGradeStructure(idClass, percentage, value, orderValue, students);
  return result;
};

exports.updateRowGradeStructures = async (idClass, gradeStructure) => {
  const result = await classRepository.updateRowGradeStructures(idClass, gradeStructure);
  return result;
};

exports.updateGradeStructure = async (idClass, gradeStructure) => {
  const result = await classRepository.updateGradeStructure(idClass, gradeStructure);
  return result;
};

exports.finalGradeStructure = async (idClass, gradeStructure) => {
  const result = await classRepository.finalGradeStructure(idClass, gradeStructure);
  return result;
};

exports.deleteGradeStructure = async (idClass, gradeStructure, id, students, deletedValue) => {
  const result = await classRepository.deleteGradeStructure(idClass, id, students, deletedValue);
  await classRepository.updateRowGradeStructures(idClass, gradeStructure);
  return result;
};

exports.getGradesStudent = async (id, idUser) => {
  const lengthGrade = await classRepository.getLengthGrades(id);

  if (lengthGrade == null) {
    const tmp = await classRepository.getAllNameStudents(id);
    tmp.forEach((item, id) => {
      item.id = id + 1;
    });
    const final = tmp.map(obj => {
      let { id, ...rest } = obj;
      return { id, ...rest };
    });

    return final
  }
  const result = await classRepository.getGradesStudent(id, idUser);
  const result2 = await classRepository.getGradeStructuresStudent(id);

  const array = result2.map(item => ({ id: item.orderValue, percentage: item.percentage }));
  array.sort((a, b) => a.id - b.id);
  const structure = array.map(item => item.percentage);
  const groupedData = {};
  result.forEach(item => {
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
  const final = finalResult.map(obj => {
    let { id, ...rest } = obj;
    return { id, ...rest };
  });
  const tmp = final.map(({ userId, classId, ...rest }) => rest);

  const reorderColumns = (obj, order) => {
    const orderedObj = { id: obj.id, fullname: obj.fullname, index: obj.index };
    order.forEach(key => {
      if (obj.hasOwnProperty(key)) {
        orderedObj[key] = obj[key];
      }
    });

    return orderedObj;
  };

  // Reorder columns for each object in the array
  const newData = tmp.map(item => reorderColumns(item, structure));

  return newData;
};

exports.getGradeStructuresStudent = async (id) => {
  return await classRepository.getGradeStructuresStudent(id);
};