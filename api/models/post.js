'use strict';
const { Model } = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  class Post extends Model {}

  Post.init({
    content: {
      type: DataTypes.STRING,
      validate: {
        len: [1, 5],
        notEmpty: true,
      }
    },
    shares: {
      type: DataTypes.INTEGER,
        validate: {
          notEmpty: true,
        }
    },
    bought: {
      type: DataTypes.FLOAT,
        validate: {
          notEmpty: true,
        }
    }
  }, {
    sequelize,
    modelName: 'post'
  });

  Post.associate = (models) => {
    // associations can be defined here
    models.Post.belongsToMany(models.User, {through: 'UserPost'});
  };

  return Post;
};