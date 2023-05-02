var express = require('express');
var router = express.Router();

const songController = require('../controllers/songController');
const userController = require('../controllers/userController');

function addUserToViews(req, res, next){
    if (req.user){
        res.locals.user = req.user;
    }
    next();
}

function redirectGuests(req, res, next){
    if (!req.user){
        res.redirect('/login');
    } else {
        next();
    }
}

/* GET home page. */
router.get('/', addUserToViews, redirectGuests, songController.viewAll);
router.get('/edit/:id', addUserToViews, redirectGuests, songController.renderEditForm);
router.post('/edit/:id', addUserToViews, redirectGuests, songController.updateSong);
router.get('/delete/:id', addUserToViews, redirectGuests, songController.deleteSong);
router.get('/add', addUserToViews, redirectGuests, songController.renderAddForm);
router.post('/add', addUserToViews, redirectGuests, songController.addSong);

router.get('/register', addUserToViews, userController.renderRegistration);
router.post('/register', addUserToViews, userController.register);

router.get('/login', addUserToViews, userController.renderLogin);
router.post('/login', addUserToViews, userController.authenticate);

router.get('/logout', addUserToViews, redirectGuests, userController.logout);
module.exports = router;
