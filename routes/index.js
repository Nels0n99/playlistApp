var express = require('express');
var router = express.Router();
const songController = require('../controllers/songController');
const userController = require('../controllers/userController');

/* GET home page. */
router.get('/', songController.viewAll);
router.get('/edit/:id', songController.renderEditForm);
router.post('/edit/:id', songController.updateSong);
router.get('/delete/:id', songController.deleteSong);
router.get('/add', songController.renderAddForm);
router.post('/add', songController.addSong);

router.get('/register', userController.renderRegistration);
router.post('/register', userController.register);

router.get('/login', userController.renderLogin);
router.post('/login', userController.authenticate);
router.get('/logout', userController.logout);
module.exports = router;
