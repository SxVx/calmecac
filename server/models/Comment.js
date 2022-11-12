'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {
      Comment.belongsTo(models.Course, {
        foreignKey: 'video_id',
        as: 'Video',
        targetKey: 'id',
        useJunctionTable: false,
      });
      Comment.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'User',
        targetKey: 'id',
        useJunctionTable: false,
      });
    }
  }
  Comment.init(
    {
      content_url: DataTypes.INTEGER,
      course_id: DataTypes.INTEGER,
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
      deleted_at: DataTypes.DATE,
    },
    {
      sequelize,
      freezeTableName: true,
      tableName: 'Comment',
      modelName: 'Comment',
      underscored: true,
      paranoid: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at',
    },
  );

  return Comment;
};
