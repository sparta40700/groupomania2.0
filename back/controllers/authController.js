const db = require("../models");
const userModel = db.User;
const bcrypt = require('bcrypt')
//const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const { signUpErrors } = require("../utils/error.utils");

/*const maxAge = 24 * 60 * 60 * 1000;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, {
    expiresIn: "maxAge",
  });
};*/

exports.signIn = async (req, res) => {
    userModel.findOne({ where: { email: req.body.email } })
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }

            // on compare l'utilisateur déjà enregistré avec celui qui se connecte
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    // on retourne une erreur si ce n'est pas valable
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect !' });
                    }
                    let token = jwt.sign({
                            //exp: Math.floor(Date.now() / 1000) + (60 * 60),
                            userId: user.id
                        }, 'eyJ1c2VySWQiOjU2LCJpYXQiOjE1OTAxODUwMDYsImV4cCI6MTU5MDI3MTQwNn0',
                        { expiresIn: '24h' }
                    );

                    // on définit le token au sein du header
                    res.setHeader('Authorization', 'Bearer ' + token);

                    // on renvoie l'utilisateur avec son token d'authentification
                    res.status(200).json({
                        userId: user.id,
                        token: token
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
  //const { email, password } = req.body;
  /*try {
    const user = await userModel.login(email, password);
    //const token = createToken(user._id);
    //res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge });
    res.status(200).json({ user: user._id });
  } catch (error) {
    //const errors = signUpErrors(error);
    res.status(200).json({ error });
    //res.status(200).json({ errors });
  }*/
};

exports.signUp = async (req, res) => {
  console.log(req.body);
  //const { pseudo, email, password, avatar, isAdmin } = req.body;

  bcrypt.hash(req.body.password, 10)
      .then(hash => {
        console.log("hash ok")
        const user = {
          pseudo: req.body.pseudo,
          email: req.body.email,
          password: hash,
          avatar: req.body.avatar,
          isAdmin: req.body.isAdmin
        };
        userModel.create(user)
            .then(data => {res.send(data)})
            .catch(error => console.log(error))
      }).catch(error => console.log(error))
  /*try {
    const user = await userModel.create({
      pseudo,
      email,
      password,
      avatar,
      isAdmin
    });
    /*res.status(201).json({
      user: user._id,
    });*/
  /*} catch (error) {
    //const errors = signUpErrors(error);
    res.status(200).send({ error });
  }*/
};
