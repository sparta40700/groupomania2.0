const router = require("express").Router();
const likeDislikesController = require("../controllers/likeDislikeController")
const auth = require('../middleware/auth-middleware');

router.post('/addLike', auth, likeDislikesController.addLike);
router.post('/addDislike', auth, likeDislikesController.addDislike);

module.exports = router;