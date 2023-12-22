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

exports.getGradeStructures = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await classService.getGradeStructures(id);
    res.json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};