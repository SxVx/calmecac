'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Video extends Model {
    static associate(models) {
      Video.belongsTo(models.Course, {
        foreignKey: 'course_id',
        as: 'Course',
        targetKey: 'id',
        useJunctionTable: false,
      });
      Video.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'User',
        targetKey: 'id',
        useJunctionTable: false,
      });
    }
  }
  Video.init(
    {
      user_id: DataTypes.INTEGER,
      video_id: DataTypes.INTEGER,
      view: DataTypes.BOOLEAN,
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
      deleted_at: DataTypes.DATE,
    },
    {
      sequelize,
      freezeTableName: true,
      tableName: 'Video',
      modelName: 'Video',
      underscored: true,
      paranoid: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at',
    },
  );

  return Video;
};
