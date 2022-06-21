// package pour la gestion des tokens
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    console.log('verification token')
    try {
        // on récupère le token dans le header authorization
        const token = req.headers.authorization;

        // on décode le token avec la clé secrète
        const decodedToken = jwt.verify(token, 'eyJ1c2VySWQiOjU2LCJpYXQiOjE1OTAxODUwMDYsImV4cCI6MTU5MDI3MTQwNn0');
        // on récupère l'user ID décodé
        const userId = decodedToken.userId;

        // on récupère l'user ID dans le paramètre de la requête
        let reqUserId = ''
        if(req.params.userId !== undefined && req.params.userId !== null){
            reqUserId = parseInt(req.params.userId)
            console.log('param not null')
        }else{
            //find another
            if(req.method === 'GET')
                reqUserId = userId
        }

        // on vérifie si l'user ID est différent du paramètre de la requête
        if (reqUserId && reqUserId !== userId || reqUserId === undefined || reqUserId === null) {
            throw 'Identifiant non valable !';
        } else {
            console.log('verifications ok')
            next();
        }
    } catch (error) {
        console.log('failure')
        res.status(401).json({ error: error | 'Requête non authentifiée !' });
    }
};