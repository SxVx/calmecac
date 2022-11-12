'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserCourse extends Model {
    static associate(models) {
      UserCourse.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'User',
        targetKey: 'id',
        useJunctionTable: false,
      });
      UserCourse.belongsTo(models.Course, {
        foreignKey: 'course_id',
        as: 'Course',
        targetKey: 'id',
        useJunctionTable: false,
      });
    }
  }
  UserCourse.init(
    {
      user_id: DataTypes.INTEGER,
      course_id: DataTypes.INTEGER,
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
      deleted_at: DataTypes.DATE,
    },
    {
      sequelize,
      freezeTableName: true,
      tableName: 'UserCourse',
      modelName: 'UserCourse',
      underscored: true,
      paranoid: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at',
    },
  );

  return UserCourse;
};
