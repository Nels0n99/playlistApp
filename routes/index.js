var express = require('express');
var router = express.Router();

const songController = require('../controllers/songController');
const userController = require('../controllers/userController');
const userHasRole = require('../middleware/userHasRole');

function redirectGuests(req, res, next){
    if (!req.user){
        res.redirect('/login');
    } else {
        next();
    }
}

/* GET home page. */
router.get('/', redirectGuests, songController.viewAll);
router.get('/edit/:id', redirectGuests, userHasRole('user'), songController.renderEditForm);
router.post('/edit/:id', redirectGuests, userHasRole('user'), songController.updateSong);
router.get('/delete/:id', redirectGuests, userHasRole('user'), songController.deleteSong);
router.get('/add', redirectGuests, userHasRole('user'), songController.renderAddForm);
router.post('/add', redirectGuests,userHasRole('user'), songController.addSong);

router.get('/users', redirectGuests, userController.viewAll);
router.get('/users/delete/:id', userController.deleteUser);
router.get('/register', userController.renderRegistration);
router.post('/register', userController.register);

router.get('/login', userController.renderLogin);
router.post('/login', userController.authenticate);

router.get('/logout', redirectGuests, userController.logout);
module.exports = router;
