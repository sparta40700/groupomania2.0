const router = require("express").Router();
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
const uploadController = require("../controllers/upload.controller");
const multer = require("multer");
const upload = multer();
//auth
router.post("/register", authController.signUp);
router.post("/login", authController.signIn);
//router.get("/logout", authController.logout);

//user display
/*router.get("/", userController.getAllUsers);
router.get("/:id", userController.userInfo);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);
router.patch("/follow/:id", userController.followUser);
router.patch("/unfollow/:id", userController.unfollowUser);
*/
//upload
/*router.post(
  "/upload",
  upload.single("file"),
  uploadController.uploadProfilePicture
);*/

module.exports = router;
