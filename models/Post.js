const sequelize = require('../config/connection');
const { Model, DataTypes } = require('sequelize');

class Post extends Model { }

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    post_title: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    post_text: {
      type: DataTypes.STRING,
      allowNull: false
    },
    post_date: {
      type: DataTypes.STRING,
      allowNull: false,

    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id',

      }
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'post',
  }
);

module.exports = Post;