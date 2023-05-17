const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comments extends Model { }

Comments.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    comment: {
      type: DataTypes.STRING,
      
    },
    user_id: {
      type: DataTypes.INTEGER,
      
      references: {
        model: 'User',
        key: 'id',
      },
    },
    post_id: {
      type: DataTypes.INTEGER,
      
      references: {
        model: 'Post',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'Comments'
  }
);

module.exports = Comments;
