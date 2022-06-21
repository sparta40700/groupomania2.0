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

exports.addLike = (req, res, next) => {
    console.log('add like')
    //console.log(req.body)
    //console.log(req.body.userId)

    User.findOne({ where: { id: req.body.userId } })
        .then(user => {
            if (!user) {
                return res.status(404).json({ error: 'Utilisateur non trouvé !' });
            }
            console.log('user find')
            let data = {}
            //update user
            //console.log(user.likes)
            //let postsId = req.body.postId
            if(user.likes.postsId){
                //console.log(user.likes.postsId)
                user.likes.postsId.push(req.body.postId)
            }else{
                user.likes = {
                    //...user.likes,
                    postsId : [req.body.postId]
                }
            }
            //console.log(typeof data)
            data.likes = user.likes

            if(user.dislikes.postsId){
                if(user.dislikes.postsId.includes(req.body.postId)){
                    let index = user.dislikes.postsId.indexOf(req.body.postId)
                    user.dislikes.postsId.splice(index, 1)
                }
            }
            data = {
                ...data,
                dislikes: user.dislikes
            }
            //console.log(user.likes)
            console.log(data)
            User.update(
                data,
                { where: { id: req.body.userId } }
            )
                .then((userResponse) => {
                    //console.log(userResponse)
                    Post.findOne({ where: { id: req.body.postId } })
                        .then((post) =>{
                            //console.log('post find')
                            //console.log(post)
                            post.nbLikes++
                            //console.log(post)
                            Post.update(
                                { nbLikes: post.nbLikes},
                                { where: { id: req.body.postId } }
                            )
                                .then(() => res.status(200).json(data))
                                .catch(error => res.status(400).json({ error }))
                        })
                        .catch(error => res.status(400).json({ error }))
                })
                .catch(error => res.status(400).json({ error }))
            //then update post

        })
        .catch(error => res.status(500).json({ error: error.message }));
}

exports.addDislike = (req, res, next) => {
    console.log('add dislike')
    User.findOne({ where: { id: req.body.userId } })
        .then(user => {
            if (!user) {
                return res.status(404).json({ error: 'Utilisateur non trouvé !' });
            }
            console.log('user find')
            let data = {}
            if(user.dislikes.postsId){
                //console.log(user.likes.postsId)
                user.dislikes.postsId.push(req.body.postId)
            }else{
                user.dislikes = {
                    postsId : [req.body.postId]
                }
            }
            data.dislikes = user.dislikes

            if(user.likes.postsId){
                if(user.likes.postsId.includes(req.body.postId)){
                    let index = user.likes.postsId.indexOf(req.body.postId)
                    user.likes.postsId.splice(index, 1)
                }
            }
            data = {
                ...data,
                likes: user.likes
            }
            console.log(data)
            //update user
            User.update(
                data,
                { where: { id: req.body.userId } }
            )
                .then((userResponse) => {
                    Post.findOne({ where: { id: req.body.postId } })
                        .then((post) =>{
                            post.nbDislikes++
                            Post.update(
                                { nbDislikes: post.nbDislikes},
                                { where: { id: req.body.postId } }
                            )
                                .then(() => res.status(200).json(data))
                                .catch(error => res.status(400).json({ error }))
                        })
                        .catch(error => res.status(400).json({ error }))
                })
                .catch(error => res.status(400).json({ error }))
        })
        .catch(error => res.status(500).json({ error: error.message }));
}