const fs = require("fs");

// package de cryptage du mot de passe
const bcrypt = require("bcrypt");

// on importe les modèles de données
const db = require("../models");

// on initialise la base de données
const User = db.User;

// package pour la gestion des tokens
const jwt = require("jsonwebtoken");

exports.getOneUser = (req, res, next) => {
  console.log("get current user");
  User.findOne({
    where: { id: req.params.userId },
  })
    .then((user) => res.status(200).json(user))
    .catch((error) => res.status(500).json(error.message));
};

// modifie l'utilisateur
exports.editUserInfos = (req, res, next) => {
  console.log("editer user infos");
  const user = User.findOne({ where: { id: req.params.userId } });

  if (user !== null) {
    User.update(
      { pseudo: req.body.username, email: req.body.email },
      { where: { id: req.params.userId } }
    )
      .then(() => res.status(200).json({ message: "Utilisateur mis à jour !" }))
      .catch((error) => {
        res.status(400).json({ error });
      });
  } else {
    return res.status(404).json({ error: "Utilisateur non trouvé !" });
  }
};

exports.editUserPassword = (req, res, next) => {
  User.findOne({ where: { id: req.params.userId } })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: "Utilisateur non trouvé !" });
      }
      console.log("creating password");
      console.log(req);
      bcrypt.hash(req.body.password, 10).then((hash) => {
        User.update({ password: hash }, { where: { id: req.params.userId } })
          .then(() =>
            res
              .status(200)
              .json({ message: "Mot de passe de l'utilisateur mis à jour !" })
          )
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.editUser = (req, res, next) => {
  User.findOne({ where: { id: req.params.userId } })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: "Utilisateur non trouvé !" });
      }

      // on contrôle s'il y a une nouvelle image
      if (req.file) {
        imageUrl = `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`;

        // on récupère le nom du fichier image depuis la base données
        const filename = user.imageUrl.split("/images/")[1];

        if (filename && filename !== "blank-profile.png") {
          // on supprime l'ancienne image
          fs.unlink(`images/${filename}`, function (error) {
            if (error) throw error;
          });
        }

        User.update(
          { imageUrl: imageUrl },
          { where: { id: req.params.userId } }
        )
          .then(() =>
            res.status(200).json({ message: "Utilisateur mis à jour !" })
          )
          .catch((error) => res.status(400).json({ error }));
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.editUserAvatar = (req, res, next) => {
  console.log("edit avatar");

  User.findOne({ where: { id: req.params.userId } })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: "Utilisateur non trouvé !" });
      }

      // on contrôle s'il y a une nouvelle image
      if (req.file) {
        const avatar = `${req.protocol}://${req.get("host")}/images/avatars/${
          req.file.filename
        }`;

        // on récupère le nom du fichier image depuis la base données
        const filename = user.avatar.split("/images/avatars/")[1];

        if (filename && filename !== "blank-profile.png") {
          // on supprime l'ancienne image
          fs.unlink(`images/avatars/${filename}`, function (error) {
            if (error) throw error;
          });
        }

        User.update({ avatar: avatar }, { where: { id: req.params.userId } })
          .then(() =>
            res
              .status(200)
              .json({ message: "Utilisateur mis à jour !", filename: avatar })
          )
          .catch((error) => res.status(400).json({ error }));
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.deleteUser = (req, res, next) => {
  //puis faire suppression
  console.log("delete user");
  User.findOne({ where: { id: req.params.userId } })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: "Utilisateur non trouvé !" });
      }
      //tester l'image d'abord

      const filename = user.avatarUrl.split("/avatars/")[1];

      if (filename !== "blank-profile.png") {
        fs.unlink(`avatars/${filename}`, function (error) {
          if (error) throw error;
        });
      }

      User.destroy({ where: { id: req.params.userId } })
        .then(() => res.status(200).json({ message: "Utilisateur supprimé !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
