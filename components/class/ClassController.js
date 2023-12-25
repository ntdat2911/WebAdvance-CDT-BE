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
    console.log(classId, className, description, title, topic, room);
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

exports.updateGrade = async (req, res) => {
  try {

    const { data } = req.body;
    const filteredData = Object.keys(data).reduce((acc, key) => {
      if (key !== 'id' && key !== 'fullname' && key !== 'index' && key !== 'sum') {
        acc[key] = data[key];
      }
      return acc;
    }, {});

    const transformedArray = [filteredData];
    const id = data.index; // Chọn id cần cập nhật

    const updates = Object.keys(transformedArray[0]).map((key) => ({
      score: transformedArray[0][key],
      type: key,
      id: id
    }));

    const finalArray = updates.map(item => ({
      ...item,
      score: item.score === "" ? null : item.score
    }));
    console.log(JSON.stringify(finalArray) + " array")
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
        if (key !== 'id' && key !== 'fullname' && key !== 'index' && key !== 'sum') {
          acc.push({
            score: item[key],
            type: key,
            index: item.index
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

exports.getGradeStructures = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id)
    const user = await classService.getGradeStructures(id);
    console.log(JSON.stringify(user))
    res.json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.addGradeStructure = async (req, res) => {
  try {
    const { idClass, percentage, value, orderValue } = req.body;
    const students = await classService.getAllStudents(idClass);

    const user = await classService.addGradeStructure(idClass, percentage, value, orderValue, students);
    res.json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.updateRowGradeStructures = async (req, res) => {
  try {
    const { idClass, gradeStructure } = req.body;
    gradeStructure.sort((a, b) => a.id - b.id);
   
    const user = await classService.updateRowGradeStructures(idClass, gradeStructure);
    res.json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.updateGradeStructure = async (req, res) => {
  try {
    const { idClass, gradeStructure } = req.body;
    console.log(gradeStructure)
    const user = await classService.updateGradeStructure(idClass, gradeStructure);
    res.json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.finalGradeStructure = async (req, res) => {
  try {
    const { idClass, gradeStructure } = req.body;

    const user = await classService.finalGradeStructure(idClass, gradeStructure);
    res.json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.deleteGradeStructure = async (req, res) => {
  try {
    const { idClass, id, gradeStructure, deletedValue } = req.body;

    const students = await classService.getAllStudents(idClass);
    const user = await classService.deleteGradeStructure(idClass, gradeStructure, id, students, deletedValue);
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
