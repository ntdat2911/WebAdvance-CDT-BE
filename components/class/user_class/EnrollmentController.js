const enrollmentService = require("./EnrollmentService");
const nodemailer = require("nodemailer");
const classService = require("../ClassService");
const jwt = require("jsonwebtoken");
const CLIENT_URL = process.env.CLIENT_URL;

const smtpTransport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "ktphanmem20@gmail.com",
    pass: process.env.EMAIL_PASSWORD,
  },
});

exports.getEnrollmentByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await enrollmentService.getEnrollmentByUserId(userId);

    res.json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.inviteByEmail = async (req, res) => {
  try {
    const { email, classId, role, from } = req.body;
    const classInfo = await classService.getAClass(classId);
    // create a jwt token contains email and classId and send to user
    const token = jwt.sign({ email, classId, role }, "mysecretkey", {
      expiresIn: "7d",
    });
    const link = `${CLIENT_URL}/${role}/class/invite/${classInfo[0].inviteCode}?token=${token}`;
    const mailOptions = {
      to: email,
      from: "",
      subject: `Class Invitation: Join ${classInfo[0].name} on Classroom`,
      html: `
        <p>Hello ${email},</p>
        <p>You have been invited to join our class by ${from}. Click the button below to access the class:</p>
        <p>This invitation will expire in 7 days.</p>
        <a href="${link}" style="display: inline-block; padding: 10px 20px; background-color: #4caf50; color: #fff; text-decoration: none; border-radius: 5px;">Join Class</a>
        <p>Thank you!</p>
      `,
    };
    smtpTransport.sendMail(mailOptions, (err) => {
      if (err) {
        console.log(err);
      }
    });
    res.json("Success");
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

// create nodemailer transporter to send email invitation to user
