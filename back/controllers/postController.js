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


// création d'un post
exports.createPost = (req, res, next) => {
    // on vérife que l'utilisateur qui fait la requête existe
    User.findOne({ where: { id: req.body.userId } })
        .then(user => {
            if (!user) {
                return res.status(404).json({ error: 'Utilisateur non trouvé !' });
            }

            let postObject = {
                userId: req.body.userId,
                title: req.body.postTitle,
                content: req.body.postText
            }

            if (req.file) {
                postObject = {
                    ...postObject,
                    imageUrl: `${req.protocol}://${req.get('host')}/images/posts/${req.file.filename}`
                }
            } else {
                postObject = {
                    ...postObject,
                    imageUrl: ''
                }
            }

            //add author
            postObject = {
                ...postObject,
                author: user.pseudo
            }

            // on sauvegarde le post
            Post.create(postObject)
                .then(() => res.status(201).json({ message: 'Le nouveau post a été enregistré !' }))
                .catch(error => res.status(500).json({ error: error.message }));
            //.catch(error => res.status(500).json({ error: 'Erreur lors de l\'enregistrement du post !' }));

        })
        .catch(error => res.status(500).json({ error }));

}

// récupère tous les posts
exports.getAllPosts = (req, res, next) => {
    // on tri les posts par ordre décroissant et on recupère les commentaires pour insérer dans la réponse
    Post.findAll({
        order: Sequelize.literal('createdAt DESC'),
    })
        .then(posts => {
            if(posts.length < 0) return res.status(404).json({ error: "Aucuns posts trouvés !"});

            /*for(const [index, post] of Object.entries(posts)) {
                //console.log(post.id)
                Comment.count({
                    where: { postId: req.params.id },
                }).then(numberOfComments => {
                    console.log(numberOfComments)
                    post.numberOfComments = numberOfComments.data
                }).catch(error => res.status(400).json({ error }));
                commentService.getNumbersOfCommentsForPost(currentUser.token, post.id)
                    .then((numberOfComments) =>{
                        //console.log(numberOfComments)
                        console.log('get number of comments')
                        post.numberOfComments = numberOfComments.data
                    }).catch(error => console.log(error.message))
            }*/

            res.status(200).json(posts)
        })
        .catch(error => res.status(400).json({ error }));
};

// récupère les informations d'un post
exports.getOnePost = (req, res, next) => {
    Post.findOne({
        where: { id: req.params.id },
    }).then(post => {
        if(!post) return res.status(404).json({ error: 'Post non trouvé !' });

        res.status(200).json(post);
    })
        .catch(error => res.status(400).json({ error }));
}

// modifie un post
exports.modifyPost = (req, res, next) => {
    Post.findOne({ where: { id: req.params.id } })
        .then(post => {

            let postObject = {
                //id: req.params.id,
                userId: post.userId,
                title: req.body.postTitle,
                content: req.body.postText
            }

            if(req.file){
                postObject = {
                    ...postObject,
                    imageUrl: `${req.protocol}://${req.get('host')}/images/posts/${req.file.filename}`
                }
                const filename = post.imageUrl.split('/images/posts/')[1];
                if (filename) {
                    // on supprime l'ancienne image
                    fs.unlink(`images/posts/${filename}`, function (error) {
                        if (error) throw error;
                    });
                }

            }else{
                postObject = {
                    ...postObject,
                    imageUrl: post.imageUrl
                }
            }
            Post.update(postObject, { where:{ id: req.params.id } })
                .then(() => res.status(200).json({ message: 'Le post a bien été modifié !' }))
                .catch(error => res.status(400).json({ message: 'voici l\'erreur lors de l\'enregistrement: ' + error }));

        }).catch(error => res.status(500).json({ error }));

}

exports.deletePost = (req, res, next) => {
    //puis faire suppression
    console.log('delete post')
    Post.findOne({ where: { id: req.params.id } })
        .then(post => {
            if (!post) {
                return res.status(404).json({ error: 'Actualité non trouvée !' });
            }
            const filename = post.imageUrl.split('/images/posts/')[1]

            console.log(filename !== undefined)
            if(filename){
                fs.unlink(`images/posts/${filename}`, function (error) {
                    if (error) throw error;
                });
            }

            Post.destroy({ where: { id: req.params.id } })
                .then(() => res.status(200).json({ message: 'Actualité supprimée !' }))
                .catch(error => res.status(400).json({ error }));

        })
        .catch(error => res.status(500).json({ error }));
}