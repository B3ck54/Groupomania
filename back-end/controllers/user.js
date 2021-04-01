const bcrypt = require('bcrypt');
const {
  json
} = require('body-parser');
const jwt = require('jsonwebtoken');
const fs = require("fs");

const {
  user
} = require('../config/db.config.js');
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
          user: user,
          token: jwt.sign({
              user_id: user.id
            },
            process.env.JWT_TOKEN_SECRET, {
              expiresIn: '1h'
            }
          )

        }))
        .catch(err => {
          res.status(400).send("Error -> " + err);
        })
    })
    .catch(err => {
      res.status(500).send("Error -> " + err);
    })
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
            UserId: user.id,
            isAdmin: user.isAdmin,
            user: user,
            token: jwt.sign({
                user_id: user.id
              },
              process.env.JWT_TOKEN_SECRET, {
                expiresIn: '1h'
              }
            )
          });
        })
        .catch(err => {
          res.status(500).send("Error -> " + err);
        })
    })
    .catch(err => {
      res.status(500).send("Error -> " + err);
    })
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
  const userId = decodedToken.user_id;


  User.findOne({
    attributes: ['id', 'email', 'username', 'isAdmin', 'imageUrl'],
    where: {
      id: userId,
    },
  }).then(user => {
    res.send(user);
  }).catch(err => {
    res.status(401).send("Error -> " + err);
  })
}
exports.editProfile = (req, res, next) => {
  
  const token = req.headers.authorization.split(" ")[1]; // on recupére le token(2eme élément du headers)
  const decodedToken = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
  const userId = decodedToken.user_id;
  
  let userObject = {};

  if (req.file) {
    User.findOne({
        id: req.params.userId
      })
      .then((user) => {
          const filename = user.imageUrl.split('/images/')[1]
          fs.unlinkSync(`images/${filename}`)
      })

    userObject = {
      ...JSON.parse(req.body.user),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    }
  } else {
    userObject = {
      ...req.body
    }
  }
  User.update({
    ...userObject
  }, {
    where: {
      id: req.params.userId // id qui est égale à l'id dans les paramètres de requêtes
    }
  }).then(() => {
    res.status(200).send('Profile has been updated');
  }).catch(err => {
    res.status(500).send("Error -> " + err);
  })
};


exports.deleteUser = (req, res) => {
  const id = req.params.userId;
  User.findOne({
      where: {
        id: id
      }
    })
    .then(user => {
      if (user.imageUrl) {
        const filename = user.imageUrl.split('./images/')[1];
        fs.unlink(`images/${filename}`, () => {
          user.destroy({
              where: {
                id: id
              }
            })
            .then(() =>
              res.status(200).json({
                message: 'User has been deleted'
              })
            )
            .catch(error => res.status(400).json({
              error
            }))
        })
      } else {
        user.destroy({
            where: {
              id: id
            }
          })
          .then(() =>
            res.status(200).json({
              message: 'User has been deleted'
            })
          )
          .catch(error => res.status(400).json({
            error
          }))
      }
    })
    .catch(error => res.status(500).json({
      error: error.message
    }))
};