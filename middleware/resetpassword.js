const jwt = require("jsonwebtoken");

require('dotenv').config();

exports.verifyToken = (req, res, next) => {
    const authHeader = req.headers.token;
    const token = authHeader && authHeader.split(" ")[1];
    try {
        if (token) {
            jwt.verify(token, process.env.ACCESS_TOKEN_RESET_PASSWORD_SECRET, (err, user) => {
                if (err) {
                    res.json("Token is not valid")
                } else {                   
                    next();
                }
            })
        } else {
            return res.status(401).json("You're not authenticated");
        }


    } catch (error) {
        return res.sendStatus(403)
    }

}
