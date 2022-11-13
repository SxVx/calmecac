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
      Video.hasMany(models.View, {
        foreignKey: 'video_id',
        as: 'View',
      });
    }
  }
  Video.init(
    {
      content_url: DataTypes.INTEGER,
      course_id: DataTypes.INTEGER,
      order_in_course: DataTypes.INTEGER,
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
