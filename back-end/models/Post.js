'use strict';
const {
  Model
} = require('sequelize');
const db = require('../config/db.config.js');

module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      Post.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
        onDelete: 'CASCADE',
      });
      models.Post.hasMany(models.Comment )

    }
  };
  Post.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    UserId: {
      type: DataTypes.INTEGER,
    },
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};