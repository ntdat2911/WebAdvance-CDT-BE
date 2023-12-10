const express = require('express');
const router = express.Router();
const authorizeController = require('./AuthController');
const middlewareToken = require('../../middleware/auth');
const passport = require('../../passport');
//router.get('/register', authorizeController.showRegisterForm);
router.post('/signup', authorizeController.register);
router.post('/login', authorizeController.login);
//router.post('/logout', middlewareToken.verifyToken, authorizeController.logout);

require('dotenv').config();

//login GOOGLE
// router.get('/google',
//     passport.authenticate('google', { scope: ['profile', 'email'] })
// );

// router.get('/google/callback',
//     passport.authenticate('google', { 
//         session: false, 
//         failureRedirect: CLIENT_URL + "sign-in"
//     }), (req, res) => {
//         //console.log(req.user + "User trong call back")
//         const user = req.user;
//         const token = jwt.sign({ email: user.email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '2h' });
//         res.redirect(`${CLIENT_URL}/home-page?user=${encodeURIComponent(JSON.stringify(user))}&token=${token}`);
//     }
// );

router.get('/google', authorizeController.loginGoogle);
router.get('/google/callback', authorizeController.authenticateGoogle, authorizeController.responseGoogle);

//login Facebook
//router.get('/facebook', authorizeController.loginFacebook);
router.get('/facebook', passport.authenticate('facebook'));
router.get('/facebook/callback', authorizeController.authenticateFacebook, authorizeController.facebookCallback);

// router.post('/facebook', passport.authenticate('facebook-token'), (req, res) => {
//     if (req.user) {
//         const token = jwt.sign({ facebookId: req.user.facebookId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '2h' });
//         res.json({ user: req.user, token });
//     } else {
//         res.status(401).json({ error: 'Authentication failed' });
//     }
// });


// router.post('/facebook', (req, res, next) => {
//     passport.authenticate('facebook-token', { session: false }, (err, user, info) => {
//         if (err) return next(err);

//         if (!user) {
//             console.error('Authentication failed:', info.message); // In thông tin lỗi vào console
//             return res.status(401).json({ error: 'Authentication failed' });
//         }

//         // Tạo JWT và gửi về client
//         const token = jwt.sign({ facebookId: user.facebookId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '2h' });
//         res.json({ user: user, token });

//     })(req, res, next);
// });

module.exports = router;