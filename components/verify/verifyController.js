const nodemailer = require("nodemailer");
const verifyService = require("./verifyService");
const jwt = require("jsonwebtoken");

const smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "ktphanmem20@gmail.com",
        pass: "ohdj zunf edoj ojum"
    }
});


exports.emailAccount = async (req, res) => {
    const email = req.query.email;
    const link = "http://localhost:5000" + "/auth/verifiedAccount?email=" + email;
    const mailOptions_account = {
        from: "ktphanmem20@gmail.com",
        to: req.query.email,
        subject: "PLEASE CONFIRM YOUR EMAIL ACCOUNT",
        html: "Hello,<br> Please Click on the link to verify your email.<br><a href=" + link + ">Click here to verify</a>"
    }
    smtpTransport.sendMail(mailOptions_account, function (error, response) {
        if (error) {
            console.log(error);
        } else {
            console.log("Message sent: " + response.response);
        }
    });
}

exports.resetPassword = async (req, res) => {
    const email = req.query.email
    const result = await verifyService.resetPassword(email);
    if (result) {
        const token = jwt.sign({ email: email }, process.env.ACCESS_TOKEN_RESET_PASSWORD_SECRET, { expiresIn: '2h' })

        const link = "http://localhost:3000" + "/auth/reset-password?token=" + token + "&email=" + email;
        const mailOptions_password = {
            from: "ktphanmem20@gmail.com",
            to: email,
            subject: "RESET YOUR PASSWORD",
            html: "Hello,<br> Please Click on the link to reset your password.<br><a href=" + link + ">Click here to reset your password</a>"
        };
        smtpTransport.sendMail(mailOptions_password, function (error, response) {
            if (error) {
                console.log(error);
            } else {
                console.log("Message sent: " + response.response);
            }
        });
        res.send("Sent email reset")
    }
    else res.send("Email not exists");
}

exports.verifyAccount = async (req, res) => {
    console.log(req.query.email)
    res.send("Xac thuc ")
    await verifyService.verifyAccount(req.query.email);
}



exports.resetPasswordSuccess = async (req, res) => {
    const email = req.body.email
    const password = req.body.password
    await verifyService.changePassword(email, password);
    res.send("Reset password success");
}