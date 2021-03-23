const bcrypt = require('bcrypt');
const {
    json
} = require('body-parser');
const jwt = require('jsonwebtoken');
const db = require('../config/db.config.js');

const Comment = db.comments;

exports.createComment = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1]; // on recupére le token(2eme élément du headers)
    const decodedToken = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
    const userId = decodedToken.userId;
    Comment.create({
            PostId: npm,
            UserId: userId,
            comment: req.body.comment
        })
        .then(comment => {
            res.send(comment);
        }).catch(err => {
            res.status(500).send("Error -> " + err);
        })
}


exports.getAllComments = (req, res, next) => {
    Comment.findAll({
            include: [{
                model: db.User,
                attributes: ['id', 'username']
            }]
        })
        .then(items => {
            const comments = [];
            items.forEach(item =>
                comments.push({
                    "id": item.id,
                    "comment": item.comment,
                    "postId": item.postId,
                    "username": item.User.username,
                    "userId": item.userId,
                    "createdAt": item.createdAt
                })
            )
            return res.status(200).json({
                comments
            })
        })
        .catch(err => {
            res.status(500).send("Error -> " + err);
        })
}

exports.getComment = (req, res, next) => {
    Comment.findOne({
            where: {
                _id: req.params.id,
            }
        })
        .then(comment => {
            res.send(comment);
        }).catch(err => {
            res.status(500).send("Error -> " + err);
        })
}

exports.editComment = (req, res, next) => {
    Comment.update({
            comment: req.body.comment
        }, {
            where: {
                _id: req.params.id,
                PostId: req.body.postId
            }
        })
        .then(comment => {
            res.send(comment);
        }).catch(err => {
            res.status(500).send("Error -> " + err);
        })
}

exports.deleteComment = async (req, res, next) => {
    const where = {
        _id: req.params.id
    }
    Comment.destroy({
        where
    })
    then(() =>
            res.status(200).json({
                message: 'Comment has been deleted'
            })
        )
        .catch(error => res.status(400).json({
            error
        }))
}