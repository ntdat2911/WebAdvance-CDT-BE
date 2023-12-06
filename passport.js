const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookTokenStrategy = require('passport-facebook-token');

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

passport.use(new FacebookTokenStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    fbGraphVersion: 'v10.0',
},
    (accessToken, refreshToken, profile, done) => {
        console.log(profile)
        const user = {
            facebookId: profile.id,
            displayName: profile.displayName,
            //email: profile.emails[0].value
        };
        console.log("Dang nhap facebook !");
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