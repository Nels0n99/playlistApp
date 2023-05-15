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
router.get('/edit/:id', redirectGuests, songController.renderEditForm);
router.post('/edit/:id', redirectGuests, songController.updateSong);
router.get('/delete/:id', redirectGuests, songController.deleteSong);
router.get('/add', redirectGuests, songController.renderAddForm);
router.post('/add', redirectGuests, songController.addSong);

router.get('/users', redirectGuests, userHasRole('admin'), userController.viewAll);
router.get('/users/delete/:id', redirectGuests, userHasRole('admin'), userController.deleteUser);
router.get('/register', userController.renderRegistration);
router.post('/register', userController.register);

router.get('/login', userController.renderLogin);
router.post('/login', userController.authenticate);

router.get('/logout', redirectGuests, userController.logout);
module.exports = router;
