'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    static associate(models) {
      Course.hasMany(models.UserCourse, {
        foreignKey: 'course_id',
        as: 'UserCourse',
      });
      Course.hasMany(models.Achievements, {
        foreignKey: 'course_id',
        as: 'Achievements',
      });
      Course.hasOne(models.Quiz, {
        foreignKey: 'course_id',
      });
      Course.hasMany(models.Video, {
        foreignKey: 'course_id',
        as: 'Video',
      });
    }
  }
  Course.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      image_url: DataTypes.STRING,
      created_by: DataTypes.INTEGER, // course creator user
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
      deleted_at: DataTypes.DATE,
    },
    {
      sequelize,
      freezeTableName: true,
      tableName: 'Course',
      modelName: 'Course',
      underscored: true,
      paranoid: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at',
    },
  );

  return Course;
};
