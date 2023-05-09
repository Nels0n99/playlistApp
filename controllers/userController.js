const {User, Role} = require('../models');
const md5 = require('md5');
const passport = require('passport');

module.exports.viewAll = async function (req, res){
    const users = await User.findAll();
    res.render('user/view_all', {users})
}

module.exports.renderRegistration = async function(req, res){
    const roles = await Role.findAll();
    console.log(roles);
    res.render('user/register', {roles});
};

module.exports.register = async function(req, res){
    const existingUser = await User.findOne({
        where: {
            email: req.body.email
        }
    });
    if(existingUser){
        res.render('user/register', {
            error: 'User Already Exists'
        })
    } else {
        await User.create({
            email: req.body.email,
            password: md5(req.body.password),
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            role_id: req.body.role
        });
        res.redirect('/login');
    }
}

module.exports.renderLogin = function (req, res) {
    let error = null;
    if  (req.session.messages && req.session.messages.length>0){
        error = req.session.messages[0]
    }
    res.render('user/login', {error});
}

module.exports.authenticate = passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureMessage: true
});

module.exports.logout = function(req, res){
    req.logout();
    res.redirect('/login');
}

module.exports.deleteUser = async function (req, res){
    await User.destroy({
        where: {
            id: req.params.id
        }
    });
    res.redirect('/users')
}

