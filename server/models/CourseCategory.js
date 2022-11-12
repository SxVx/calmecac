'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class CourseCategory extends Model {
    static associate(models) {
      CourseCategory.belongsTo(models.Category, {
        foreignKey: 'category_id',
        as: 'Category',
        targetKey: 'id',
        useJunctionTable: false,
      });
      CourseCategory.belongsTo(models.Course, {
        foreignKey: 'course_id',
        as: 'Course',
        targetKey: 'id',
        useJunctionTable: false,
      });
    }
  }
  CourseCategory.init(
    {
      course_id: DataTypes.INTEGER,
      category_id: DataTypes.INTEGER,
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
      deleted_at: DataTypes.DATE,
    },
    {
      sequelize,
      freezeTableName: true,
      tableName: 'CourseCategory',
      modelName: 'CourseCategory',
      underscored: true,
      paranoid: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at',
    },
  );

  return CourseCategory;
};
