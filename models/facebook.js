/**
 * Created by Eless on 19.07.2015.
 */
var passport = require('passport')
    , FacebookStrategy = require('passport-facebook').Strategy
    , session = require('express-session')
    , cookieParser = require("cookie-parser")
;
var log = require('models/log')(module);

var FACEBOOK_APP_ID = '1470515129932488';
var FACEBOOK_APP_SECRET = 'MyBigSecret';

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    done(null, obj);
});
passport.use(new FacebookStrategy({
        clientID: FACEBOOK_APP_ID,
        clientSecret: FACEBOOK_APP_SECRET,
        callbackURL: "http://localhost:3000"
    },
    function(accessToken, refreshToken, index, done) {
        process.nextTick(function () {

            return done(null, index);
        });
    }
));

module.exports = passport;
