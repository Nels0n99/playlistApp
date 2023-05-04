const passport = require('passport');
const {Strategy} = require('passport-local').Strategy;
const {User, Role} = require('../models');
const md5 = require('md5');


async function verifyUser(username, password, done) {
    //fetch user from database
    const user = await User.findOne({
        where: {
            email: username,
            password: md5(password)
        }
    });
    //if no user, or passwords do not match, call done with a failure message
    if (!user) {
        return done(null, false, {message: 'Incorrect email or password.'});
    }
    //passed authentication, so user passes
    return done(false, {
        id: user.id
    });
}

passport.use(
    new Strategy(
        {
            usernameField: 'email',
            passwordField: 'password'
        },
        verifyUser
    )
);


passport.serializeUser(function(user, done) {
    process.nextTick(function () {
        done(null, {id: user.id});
    });
});


passport.deserializeUser(async function (user, done) {
    const userModel = await User.findByPk(user.id, {
        include: [
            'role'
        ]
    });
    process.nextTick(function () {
        return done(null, userModel)
    });
});

module.exports.passport = passport;