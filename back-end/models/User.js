const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    // username: {
    //   type: DataTypes.STRING,
    //   unique: true,
    //   allowNull: false,
    // },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return User;
};