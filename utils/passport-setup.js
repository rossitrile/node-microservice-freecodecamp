const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const FacebookStrategy = require('passport-facebook');

passport.use(
    new GoogleStrategy(global.gConfig.oauth.google, (accessToken, refreshToken, profile, done) => {
        // passport callback function
        const userData = {
            username: profile.displayName,
            email: profile.emails[0].value,
            password: profile.emails[0].value,
        }
        done(null, userData)
    })
)
module.exports = passport;