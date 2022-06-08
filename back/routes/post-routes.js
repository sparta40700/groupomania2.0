const router = require("express").Router();
const postController = require("../controllers/postController");
const multer = require("multer");
const upload = multer();

router.get("/", postController.getAllPosts);
router.post("/", upload.single("file"), postController.createPost);
router.put("/:id", postController.updatePost);
router.delete("/:id", postController.deletePost);
router.patch("/like-post/:id", postController.likePost);
router.patch("/unlike-post/:id", postController.unlikePost);

//comment
router.patch("/comment-post/:id", postController.commentPost);
router.patch("/edit-comment/:id", postController.editComment);
router.patch("/delete-comment/:id", postController.deleteComment);

module.exports = router;
