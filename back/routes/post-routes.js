const router = require("express").Router();
const postController = require("../controllers/postController");
//const multer = require("multer");
//const upload = multer();
const auth = require('../middleware/auth-middleware');
const multer = require('../middleware/multer-config-imgPosts');

router.post('/create', auth, multer, postController.createPost);
router.get('/', auth, postController.getAllPosts);
router.get('/:id', auth, postController.getOnePost);
router.post('/modify/:id', auth, multer, postController.modifyPost);
router.delete('/delete/:id', auth, postController.deletePost);
//router.get("/", postController.readPosts);
/*router.post("/", upload.single("file"), postController.createPost);
router.put("/:id", postController.updatePost);
router.delete("/:id", postController.deletePost);
router.patch("/like-post/:id", postController.likePost);
router.patch("/unlike-post/:id", postController.unlikePost);

//comment
router.patch("/comment-post/:id", postController.commentPost);
router.patch("/edit-comment/:id", postController.editComment);
router.patch("/delete-comment/:id", postController.deleteComment);*/

module.exports = router;
