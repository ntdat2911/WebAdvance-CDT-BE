const express = require('express');
const router = express.Router();
const passport = require("../../passport")
const authorizeController = require('./AuthController');
const middlewareToken = require('../../middleware/auth');
const jwt = require("jsonwebtoken")

const CLIENT_URL = "http://localhost:3000/";

//router.get('/register', authorizeController.showRegisterForm);
router.post('/signup', authorizeController.register);
router.post('/login', authorizeController.login);
//router.post('/logout', middlewareToken.verifyToken, authorizeController.logout);


//login GOOGLE
router.get('/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
    passport.authenticate('google', { 
        session: false, 
        failureRedirect: CLIENT_URL + "sign-in"
    }), (req, res) => {
        //console.log(req.user + "User trong call back")
        const user = req.user;
        const token = jwt.sign({ email: user.email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '2h' });
        res.redirect(`${CLIENT_URL}/home-page?user=${encodeURIComponent(JSON.stringify(user))}&token=${token}`);
    }
);

router.get('/google/success', (req, res) => {
    if (req.user) {
        const user = req.user;
        console.log(user)
        const token = jwt.sign({ email: user.email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '2h' });
        res.json({ user, token });
    }else{
        console.log(req.user)
        res.json("Nothing")
    }
});



module.exports = router;