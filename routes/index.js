var express = require('express');
var router = express.Router();
var controller = require('../controllers');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Api Rest Songs' });
});


router.get('/songs',controller.allSongs);
router.post('/songs/newsong',controller.createSong);
router.get('/songs/:songId',controller.getSong);
router.put('/songs/:songId',controller.updateSong);
router.delete('/songs/:songId',controller.removeSong);

router.param('songId',controller.songByID);

module.exports = router;
