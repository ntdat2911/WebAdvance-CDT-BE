const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook');

require('dotenv').config();

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback',
}, (accessToken, refreshToken, profile, done) => {

    const user = {
        googleId: profile.id,
        displayName: profile.displayName,
        email: profile.emails[0].value
    };

    return done(null, user);
}));

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: 'http://localhost:5000/auth/facebook/callback',
    profileFields: ['id', 'displayName', 'email'],
},
    (accessToken, refreshToken, profile, done) => {
        const user = {
            facebookId: profile.id,
            displayName: profile.displayName,
            //email: profile.emails[0].value
        };
  
        return done(null, user);
    }
));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

module.exports = passport;