'use strict';
const { Model } = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  class User extends Model {}

  User.init({
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      }
    },
    password: {
      type: DataTypes.STRING,
        validate: {
          len: [6, 20],
          notEmpty: true,
        }
    }
  }, {
    sequelize,
    modelName: 'user'
  });

  User.associate = (models) => {
    // associations can be defined here
      models.User.belongsToMany(models.Post, {through: 'UserPost'});
  };

  return User;
};