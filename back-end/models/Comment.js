'use strict';
const {
  Model
} = require('sequelize');
const db = require('../config/db.config.js');

module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {
      Comment.belongsTo(models.User, {
          foreignKey: {
            allowNull: false
          },
          onDelete: 'CASCADE',
        }),
        Comment.belongsTo(models.Post, {
          foreignKey: {
            allowNull: false,

          },
          onDelete: 'CASCADE',
        })
    }
  };
  Comment.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    UserId: {
      type: DataTypes.INTEGER,

    },
    PostId: {
      type: DataTypes.INTEGER,
    },

    comment: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};