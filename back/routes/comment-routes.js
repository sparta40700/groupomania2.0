const router = require("express").Router();
const commentController = require("../controllers/commentController");
const auth = require("../middleware/auth-middleware");
//const multer = require('../middleware/multer-config-imgPosts');

router.post("/create", auth, commentController.createComment);
router.get("/:id", auth, commentController.getOneComment);
router.get("/from/post/:id", auth, commentController.getAllCommentsFromPost);
router.get(
  "/number/from/post/:id",
  auth,
  commentController.getNumberOfCommentsFromPost
);

module.exports = router;
