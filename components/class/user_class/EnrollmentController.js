const enrollmentService = require("./EnrollmentService");

exports.getEnrollmentByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await enrollmentService.getEnrollmentByUserId(userId);

    res.json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getEnrollmentByClassId = async (req, res) => {
  try {
    const { classId } = req.params;

    const user = await enrollmentService.getEnrollmentByClassId(classId);

    res.json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.insertEnrollment = async (req, res) => {
  try {
    const { userId, classId, role } = req.body;
    enrollmentService.insertEnrollment(userId, classId, role);
    res.status(200).json("Success");
  } catch (error) {
    res.status(500).json(error);
  }
};
