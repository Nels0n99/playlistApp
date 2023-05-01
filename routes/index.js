var express = require('express');
var router = express.Router();

const songController = require('../controllers/songController');
const userController = require('../controllers/userController');

function addUserToViews(req, res, next){
    if (req.user){
        res.locals.user = req.user;
    }
    next()
}

/* GET home page. */
router.get('/', addUserToViews, songController.viewAll);
router.get('/edit/:id', addUserToViews, songController.renderEditForm);
router.post('/edit/:id', addUserToViews, songController.updateSong);
router.get('/delete/:id', addUserToViews, songController.deleteSong);
router.get('/add', addUserToViews, songController.renderAddForm);
router.post('/add', addUserToViews, songController.addSong);

router.get('/register', addUserToViews, userController.renderRegistration);
router.post('/register', addUserToViews, userController.register);

router.get('/login', addUserToViews, userController.renderLogin);
router.post('/login', addUserToViews, userController.authenticate);

router.get('/logout', userController.logout);
module.exports = router;
