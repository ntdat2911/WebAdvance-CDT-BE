const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

require('dotenv').config();

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

passport.use(new GoogleStrategy({
    clientID: "313494158170-udp5jf7a8fcu45k10e853vmdi7jc449f.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: 'http://localhost:5000/auth/google/callback',
}, (accessToken, refreshToken, profile, done) => {
    console.log(user + "Toi day r")
    const user = {
        googleId: profile.id,
        displayName: profile.displayName,
        // Thêm thông tin khác nếu cần
    };
    return done(null, user);
}));


module.exports = passport;