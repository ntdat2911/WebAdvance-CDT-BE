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
    await enrollmentService.insertEnrollment(userId, classId, role);
    res.status(200).json("Success");
  } catch (error) {
    res.status(500).json(error);
  }
};

// get role of user in a class
exports.getRoleEnrollmentByUserIdAndClassId = async (req, res) => {
  try {
    const { userId, classId } = req.body;

    const user = await enrollmentService.getRoleEnrollmentByUserIdAndClassId(
      userId,
      classId
    );

    res.json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};
