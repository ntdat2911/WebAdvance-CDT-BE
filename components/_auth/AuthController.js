const authorizeService = require('./AuthService');
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt');
const passport = require('../../passport'); 

require('dotenv').config()

exports.register = async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);
    const user = await authorizeService.register(req.body.fullname, req.body.email, hash);

    if (user == "Email exists") {
        res.json(user);
    } else {
        if (user.insertId)
            res.status(200).json("Insert Successfully");
        else res.status(500).json("Insert Error");
    }
}

exports.login = async (req, res) => {

    const user = await authorizeService.getUserByEmail(req.body.email);
    console.log(user.verified + " VERIFY")
    if (!user) {
        res.json("No user found");
    } else {
        if (user[0].verified == 0) {
            res.json("Email is not verified");
        } else {
            const validPassword = await bcrypt.compare(req.body.password, user[0].password);
            if (!validPassword) {
                res.json("Wrong password");
            } else {
                const accessToken = jwt.sign({ email: user.email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '2h' })
                //res.cookie("token", accessToken);
                delete user[0].password;

                res.json({
                    user,
                    accessToken
                });
            }
        }

    }
}

exports.loginGoogle = (req, res) => {
    const user = req.user;
    console.log(user)
    const token = jwt.sign({ email: user.email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '2h' });
    res.json({ user, token });
}

exports.logout = async (req, res) => {
    const authHeader = req.headers.token;
    console.log(req.headers.token);
    const token = authHeader && authHeader.split(" ")[1];

}