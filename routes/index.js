var express = require('express');
var router = express.Router();
const songController = require('../controllers/songController');

/* GET home page. */
router.get('/', songController.viewAll);
router.get('/edit/:id', songController.renderEditForm);
router.post('/edit/:id', songController.updateSong);
router.get('/delete/:id', songController.deleteSong);
router.get('/add', songController.renderAddForm);
router.post('/add', songController.addSong);

module.exports = router;
