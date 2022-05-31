// package express
const express = require('express');

// création d'un routeur
const router = express.Router();

// importations des middleware d'authentification et de gestion des images
const auth = require('../middleware/auth-middleware.js');
const multer = require('../middleware/multer-config.js');

// contrôleur pour associer la route profile
const profileController = require('../controllers/profileController');

// routes de l'API pour le profile
router.get('/:userId',auth, profileController.getOneUser);
router.put('/edit/:userId', auth, multer, profileController.editUser);

router.post('/avatar/:userId', auth, multer, profileController.editUserAvatar);

router.put('/infos/:userId', auth, profileController.editUserInfos);
router.put('/password/:userId', auth, profileController.editUserPassword);
router.delete('/delete/:userId', auth, profileController.deleteUser);

// on exporte le router du profile utilisateur
module.exports = router;