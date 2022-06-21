// package pour la gestion des images
const multer = require('multer');

// dictionnaire des extensions d'images
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpeg',
    'image/png': 'png',
    'image/gif': 'gif',
    'video/webm': 'webm'
};

// configuration de multer
const storage = multer.diskStorage({
    // on configure la destination des images qui seront enregistrés
    destination: (req, file, callback) => {
        callback(null, 'images/posts/');
    },
    // on configure les extensions d'images acceptés
    filename: (req, file, callback) => {
        // on supprime les espaces contenue dans le nom des fichiers
        //console.log(file)
        //console.log(file.originalname)
        const name = file.originalname.split(' ').join('_');

        // on retire le nom de l'extension pour renommer plus tard
        const removeExtension = name.split('.')[0]

        // on applique l'extension au fichier
        const extension = MIME_TYPES[file.mimetype];

        // on génère un nom de fichier avec la suppression des espaces + la date du jour et l'extension du fichier
        callback(null, removeExtension + Date.now() + '.' + extension);
    }
});

module.exports = multer({ storage }).single('postImg');