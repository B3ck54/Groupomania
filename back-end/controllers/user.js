const bcrypt = require('bcrypt');
const { json } = require('body-parser');
const jwt = require('jsonwebtoken');

const db = require('../config/db.config.js');
const User = db.user;

exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        email: req.body.email,
        username: req.body.username,
        password: hash,
        isAdmin: false,
      });
      user.save()
        .then(() => res.status(201).json({
          message: `Utilisateur créé !`,
          userId: user.id,
          token: jwt.sign({
            userId: user.id
          },
          process.env.JWT_TOKEN_SECRET, {
            expiresIn: '1h'
          }
        )

        }))
        .catch(error => res.status(400).json({
          error
        }));
    })
    .catch(error => res.status(500).json({
      error
    }));
};

exports.login = (req, res, next) => {
  User.findOne({
      where: {
        email: req.body.email,
      },
    })
    .then(user => {
      if (!user) {
        return res.status(401).json({
          error: 'Utilisateur non trouvé !'
        });
      }
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({
              error: 'Mot de passe incorrect !'
            });
          }
          res.status(200).json({
            userId: user.id,
            isAdmin: user.isAdmin,

            token: jwt.sign({
                userId: user.id
              },
              process.env.JWT_TOKEN_SECRET, {
                expiresIn: '1h'
              }
            )
          });
        })
        .catch(error => res.status(500).json({
          error
        }));
    })
    .catch(error => res.status(500).json({
      error
    }));
};

exports.getAllUsers = (req, res, next) => {
  User.findAll().then(users => {
    // Send all user to Client
    res.send(users);
  }).catch(err => {
    res.status(401).send("Error -> " + err);
  })
};

exports.getProfile = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1]; // on recupére le token(2eme élément du headers)
  const decodedToken = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
  const id = decodedToken.userId;
  User.findOne({
    attributes: ['id', 'email', 'username','isAdmin'],
        where: { id: id }
  }).then(user => {
    res.send(user);
  }).catch(err => {
    res.status(401).send("Error -> " + err);
  })
}
exports.editProfile = (req, res, next) => {
  let userObject = {};

  User.update({
    ...userObject
  }, {
    where: {
      id: req.params.userId // id qui est égale à l'id dans les paramètres de requêtes
    }
  }).then(() => {
    res.status(200).send('Profil mis à jour');
  }).catch(err => {
    res.status(500).send("Error -> " + err);
  })
};

//

exports.deleteUser = (req, res) => {
  const id = req.params.userId;
  User.destroy({
    where: {
      id: id
    }
  }).then(() => {
    res.status(200).send('Compte supprimé');
  }).catch(err => {
    res.status(500).send("Error -> " + err);
  });
};