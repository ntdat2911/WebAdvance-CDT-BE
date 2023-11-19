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


exports.showAccount = (req, res) => {
    res.render('verify/account', { layout: false });
}

exports.emailAccount = async (req, res) => {
    const email = req.query.email;
    const link = "http://localhost:5000" + "/auth/verifiedAccount?email=" + email;
    const mailOptions_account = {
        from: "ktphanmem20@gmail.com",
        to: req.query.email,
        subject: "PLEASE CONFIRM YOUR EMAIL ACCOUNT",
        html: "Hello,<br> Please Click on the link to verify your email.<br><a href=" + link + ">Click here to verify</a>"
    }
    await smtpTransport.sendMail(mailOptions_account, function (error, response) {
        if (error) {
            console.log(error);
        } else {
            console.log("Message sent: " + response.response);
        }
    });
}

exports.verifyAccount = async (req, res) => {
    console.log(req.query.email)
    res.send("Xac thuc ")
    await verifyService.verifyAccount(req.query.email);
}

exports.emailPassword = async (req, res) => {
    const { email: email } = req.query;

    const host = req.get('host');
    const link = "https://" + host + "/verify/verifyPassword?email=" + email;
    const mailOptions_password = {
        from: "netcafe.cdp@gmail.com",
        to: email,
        subject: "RESET YOUR PASSWORD",
        html: "Hello,<br> Please Click on the link to reset your password.<br><a href=" + link + ">Click here to reset your password</a>"
    };
    await smtpTransport.sendMail(mailOptions_password, function (error, response) {
        if (error) {
            console.log(error);
        } else {
            console.log("Message sent: " + response.response);
        }
    });
    res.render('verify/password', { layout: false });
}

exports.verifyPassword = (req, res) => {
    console.log(req.get('host'));
    console.log(host);
    if (req.get('host') === (host)) {
        console.log(EMAIL);
        console.log(req.query.email);
        if (req.query.email === EMAIL) {
            console.log("reset password");
            res.render('verify/reset_password', { layout: false });
        }
        else {
            console.log("cannot reset password");
            res.render('verify/password_failed', { layout: false });
        }
    } else {
        res.render('verify/password_failed', { layout: false });
    }
}

exports.resetPassword = async (req, res) => {
    if (!ajv.validate(resetPasswordSchema, req.body)) {
        res.render('verify/reset_password', { layout: false, error: 'Invalid input!' });
        return;
    }
    const {
        newpassword: newpassword,
        renewpassword: renewpassword
    } = req.body;
    if (newpassword !== renewpassword) {
        res.render("verify/reset_password", { layout: false, error: 'New passwords do not match!' });
        return;
    } else {
        try {
            await verifyService.changePassword(EMAIL, newpassword);
            res.render('verify/password_successful', { layout: false });
            return;
        } catch (e) {
            res.render('verify/password_failed', { layout: false });
            return;
        }
    }
}