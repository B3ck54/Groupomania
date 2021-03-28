const bcrypt = require('bcrypt');
const {
  json
} = require('body-parser');
const jwt = require('jsonwebtoken');
const fs = require("fs");

const db = require('../config/db.config.js');
const {
  user
} = require('../config/db.config.js');
const {
  post
} = require('../config/db.config.js');

const Post = db.posts;

const User = db.user;
const Answer = db.answers;

exports.createPost = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1]; // on recupére le token(2eme élément du headers)
  const decodedToken = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
  const userId = decodedToken.user_id;

  // Save to MySQL database
  Post.create({
    ...req.body,
    UserId: userId,
    imageUrl: (req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null)

  }).then(post => {
    // Send created post to client
    res.send(post);
  }).catch(err => {
    res.status(500).send("Error -> " + err);
  })
};

exports.getAllPosts = (req, res, next) => {
  Post.findAll({
    attributes: ["id", "message", "imageUrl", "createdAt"],
    order: [
      ["createdAt", "DESC"]
    ],
    include: [{
        model: User,
        attributes: ["id", "username"],
      },
      {
        model: Answer,
        attributes: ["comment", "username", "UserId", "id"],
        order: [
          ["createdAt", "DESC"]
        ],
        include: [{
          model: User,
          attributes: ["username"],
        }, ],
      },
    ],
  }).then(post => {
    // Send all posts to Client
    res.send(post);
  }).catch(err => {
    res.status(500).send("Error -> " + err);
  })
};

exports.getOnePost = (req, res, next) => {
  Post.findOne(req.params.postId).then(post => {
    res.send(post);
  }).catch(err => {
    res.status(500).send("Error -> " + err);
  })
};

exports.editPost = (req, res, next) => {
  let postObject = {};
  if (req.file) {
    Post.findOne({
        _id: req.params.id
      })
      .then((post) => {
        const filename = post.imageUrl.split('/images/')[1]
        fs.unlinkSync(`images/${filename}`)
      })


    postObject = {
      ...JSON.parse(req.body.post),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    }
  } else {
    postObject = {
      ...req.body
    }
  }
  Post.update({
      ...postObject
    }, {
      where: {
        id: req.params.id
      }
    }).then(() =>
      res.status(200).json({
        message: 'Post has been updated'
      })
    )
    .catch(err => {
      res.status(400).send("Error -> " + err);
    })
};
exports.deletePost = (req, res, next) => {

  //Attention à corriger !!!!! supprime les posts sur n'importe quel id
  const where = {
    id: req.params.id
  }
  Post.findOne({
      where
    })
    .then(post => {
      // const filename = post.imageUrl.split('./images/')[1];
      // fs.unlink(`images/${filename}`, () => {

      if (!post) {
        res.status(400).json({
          error: "Unauthorized"
        })
      }
      post
        .destroy()
        .then(() =>
          res.status(200).json({
            message: 'Post has been deleted'
          })
        )
        .catch(error => res.status(400).json({
          error
        }))
    })
    // })

    .catch(error => res.status(500).json({
      error: error.message
    }))
};
exports.createAnswer = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1]; // on recupére le token(2eme élément du headers)
  const decodedToken = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
  const userId = decodedToken.user_id;
  Answer.create({
      PostId: req.params.id,
      username: req.body.commentUsername,
      comment: req.body.comment,
      UserId: userId,
    })
    .then(answer => {
      res.send(answer);
    }).catch(err => {
      res.status(500).send("Error -> " + err);
    })
};

exports.deleteAnswer = async (req, res, next) => {
  const where = {
    id: req.params.id
  }
  Answer.findOne({
      where
    })
    .then(answer => {
      if (!answer) {
        res.status(400).json({
          error: "Unauthorized"
        })
      }
      answer
        .destroy()
        .then(() =>
          res.status(200).json({
            message: 'Answer has been deleted'
          })
        )
        .catch(err => {
          res.status(500).send("Error -> " + err);
        })
    })
}


  