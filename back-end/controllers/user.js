
const bcrypt = require ('bcrypt');
const { json } = require('body-parser');
const jwt = require('jsonwebtoken');

const db = require('../config/db.config.js');
const User = db.users;

exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        email: req.body.email,
        username: req.body.username,
        password: hash
      });
      user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};
 
exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          res.status(200).json({
            token: jwt.sign(
              { userId: user.id },
              process.env.JWT_TOKEN_SECRET,
              { expiresIn: '1h' }
            )
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

exports.logout = (req, res, next) => {
  req.session.destroy(function(err){  
    if(err){  
        console.log(err);  
    }  
    else  
    {  
        res.redirect('/');  
    }  
  });  
};

exports.getAllUsers = (req, res, next) => {
	User.findAll().then(users => {
		// Send all user to Client
		res.send(users);
	}).catch(err => {
		res.status(500).send("Error -> " + err);
	})
};

exports.getUser = (req, res, next) => {	
	User.findByPk(req.params.userId).then(user => {
    // Send on user to Client
		res.send(user);
	}).catch(err => {
		res.status(500).send("Error -> " + err);
	})
};

exports.editProfile = (req, res, next) => {
	var user = req.body;
	const id = req.params.userId;
	User.update( { email: req.body.email, username: req.body.username }, 
						{ where: {id: req.params.userId} }
				   ).then(() => {
						res.status(200).send('Profil mis à jour');
				   }).catch(err => {
						res.status(500).send("Error -> " + err);
				   })
};

exports.deleteUser = (req, res) => {
	const id = req.params.userId;
	User.destroy({
	  where: { id: id }
	}).then(() => {
		res.status(200).send('Compte supprimé');
	}).catch(err => {
		res.status(500).send("Error -> " + err);
	});
};