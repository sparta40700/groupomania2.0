// on importe les modèles de données
const db = require("../models");

// package Sequelize
const Sequelize = require("sequelize");

// système de fichiers
const fs = require('fs');

// on initialise la base de données des utilisateurs
const User = db.User;

// on initialise la base de données des posts
const Post = db.Post;

// on initialise la base de données des commentaires
const Comment = db.Comment;

// récupérer tous les commentaires pour un post
exports.getAllCommentsFromPost = (req, res, next) => {
    console.log('get comments')
// on tri les posts par ordre décroissant et on recupère les commentaires pour insérer dans la réponse
    Comment.findAll({
        where: { postId: req.params.id },
        order: Sequelize.literal('createdAt DESC'),
    })
        .then(comments => {
            if(comments.length < 0) return res.status(404).json({ error: "Aucuns posts trouvés !"});

            res.status(200).json(comments)
        })
        .catch(error => res.status(400).json({ error }));
}

// récupérer un commentaire
exports.getOneComment = (req, res, next) => {
    console.log('get one comment')
    Comment.findOne({
        where: { id: req.params.id }
    })
        .then(comment => {
            if(comment.length < 0) return res.status(404).json({ error: "Aucuns posts trouvés !"});

            res.status(200).json(comment)
        })
        .catch(error => res.status(400).json({ error }));
}

exports.getNumberOfCommentsFromPost = (req, res, next) => {
    console.log('get number of comments for post')

    Comment.count({
        where: { postId: req.params.id },
    }).then(numberOfComments => {
            res.status(200).json(numberOfComments)
        })
        .catch(error => res.status(400).json({ error }));
}

// création d'un commentaire
exports.createComment = (req, res, next) => {
    console.log('create comment')
    console.log(req.body)
    // on vérife que l'utilisateur qui fait la requête existe
    User.findOne({ where: { id: req.body.userId } })
        .then(user => {
            if (!user) {
                return res.status(404).json({ error: 'Utilisateur non trouvé !' });
            }

            console.log('user find')
            let commentObject = {
                postId: req.body.postId,
                userId: req.body.userId,
                author: user.pseudo,
                content: req.body.comment
            }

            console.log(commentObject)
            // on sauvegarde le commentaire
            Comment.create(commentObject)
                .then(() => res.status(201).json({ message: 'Le nouveau commentaire a été enregistré !' }))
                .catch(error => res.status(500).json({ error: error.message }));
            //.catch(error => res.status(500).json({ error: 'Erreur lors de l\'enregistrement du commentaire !' }));

        })
        .catch(error => res.status(500).json({ error: error.message }));

}

// modifie un post
exports.modifyComment = (req, res, next) => {
    //console.log('modify comment')
    //console.log(req.params)
    //console.log(req.params.id)
    Comment.findOne({ where: { id: req.params.id } })
        .then(comment => {
            //console.log('comment exists')
            //comment.content = req.body.content
            Comment.update({content: req.body.comment}, { where:{ id: req.params.id } })
                .then(() => res.status(200).json({ message: 'Le commentaire a bien été modifié !' }))
                .catch(error => res.status(400).json({ message: 'voici l\'erreur lors de l\'enregistrement: ' + error }));

        }).catch(error => res.status(500).json({ error }));

}

exports.deleteComment = (req, res, next) => {
    //puis faire suppression
    console.log('delete comment')
    Comment.findOne({ where: { id: req.params.id } })
        .then(comment => {
            if (!comment) {
                return res.status(404).json({ error: 'Commentaire non trouvé !' });
            }

            Comment.destroy({ where: { id: req.params.id } })
                .then(() => res.status(200).json({ message: 'Commentaire supprimé !' }))
                .catch(error => res.status(400).json({ error }));

        })
        .catch(error => res.status(500).json({ error }));
}