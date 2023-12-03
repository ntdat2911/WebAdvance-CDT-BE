const authorizeService = require('./AuthService');
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt');
const passport = require('../../passport');

const CLIENT_URL = "http://localhost:3000/";
require('dotenv').config()

exports.register = async (req, res) => {
    if (await authorizeService.checkEmailExists(req.body.email)) {
        res.json("Email exists");
    } else {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(req.body.password, salt);
        const user = await authorizeService.register(req.body.fullname, req.body.email, hash);  
        res.status(200).json("Insert Successfully");
    }
}

exports.login = async (req, res) => {
    const user = await authorizeService.getUserByEmail(req.body.email);
    console.log(user + " User")
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
                const payload = { email: user[0].email, role: user[0].role }
    
                const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '2h' })
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

exports.loginGoogle = passport.authenticate('google', { scope: ['profile', 'email'] })
exports.loginFacebook = passport.authenticate('facebook-token', { session: false }), (req, res) => {
    if (req.user) {
        // Tạo JWT và gửi về client
        const token = jwt.sign({ facebookId: req.user.facebookId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '2h' });
        res.json({ user: req.user, token });
    } else {
        res.status(401).json({ error: 'Authentication failed' });
    }
};

exports.authenticateGoogle = passport.authenticate('google', {
    session: false,
    failureRedirect: CLIENT_URL + 'sign-in'
});

exports.authenticateFacebook = passport.authenticate('facebook', {
    failureRedirect: CLIENT_URL + 'sign-in'
});


exports.responseGoogle = async (req, res) => {
    const email = req.user.email;
    if (await authorizeService.checkEmailExists(email)) {
        res.redirect(`${CLIENT_URL}/sign-in?exists=true`);
    } else {
        const password = "gooogle account"
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        const user = await authorizeService.register(user.displayName, user.email, hash);
        const token = jwt.sign({ email: email, role: "student" }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '2h' });
        res.redirect(`${CLIENT_URL}/home-page?token=${token}&user=${encodeURIComponent(JSON.stringify(user))}`);
    }

}

exports.facebookCallback = async (req, res) => {
    const user = req.user;
    if (await authorizeService.checkEmailExists(user.email)) {
        res.redirect(`${CLIENT_URL}/sign-in?exists=true`);
    } else {
        const password = "facebook account"
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        const user = await authorizeService.registerSocial(user.displayName, user.email, hash);

        const token = jwt.sign({ email: user.email, role: "student" }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '2h' });
        res.redirect(`${CLIENT_URL}/home-page?token=${token}&user=${encodeURIComponent(JSON.stringify(user))}`);
    }
};

exports.logout = async (req, res) => {
    const authHeader = req.headers.token;
    console.log(req.headers.token);
    const token = authHeader && authHeader.split(" ")[1];

}