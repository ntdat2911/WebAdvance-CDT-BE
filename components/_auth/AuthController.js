const authorizeService = require('./AuthService');
const jwt = require("jsonwebtoken")
const verifyToken = require("../../middleware/auth")
require('dotenv').config()

exports.register = async (req, res) => {
    console.log(req.body)
    res.send("Recive" + req.body.email);
}

exports.login = async (req, res) => {
    const user = await authorizeService.getUserByEmail(req.body.email);

    if(!user)
    {
        res.send("No user found");
    }

    const accessToken = jwt.sign({email: user.email}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15s'})
    res.cookie("token", accessToken);
    res.json("Success");
    //res.json({accessToken})
}