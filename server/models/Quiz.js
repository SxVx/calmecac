'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Quiz extends Model {
    static associate(models) {
      Quiz.belongsTo(models.Course, {
        foreignKey: 'course_id',
        as: 'Course',
        targetKey: 'id',
        useJunctionTable: false,
      });
      Quiz.hasMany(models.Question, {
        foreignKey: 'quiz_id',
        as: 'Question',
      });
    }
  }
  Quiz.init(
    {
      course_id: DataTypes.INTEGER,
      minimum_questions_favor: DataTypes.INTEGER,
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
      deleted_at: DataTypes.DATE,
    },
    {
      sequelize,
      freezeTableName: true,
      tableName: 'Quiz',
      modelName: 'Quiz',
      underscored: true,
      paranoid: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at',
    },
  );

  return Quiz;
};
