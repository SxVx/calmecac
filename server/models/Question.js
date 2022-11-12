'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
    static associate(models) {
      Question.belongsTo(models.Quiz, {
        foreignKey: 'quiz_id',
        as: 'Quiz',
        targetKey: 'id',
        useJunctionTable: false,
      });
    }
  }
  Question.init(
    {
      question: DataTypes.STRING,
      answer: DataTypes.STRING,
      quiz_id: DataTypes.INTEGER,
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
      deleted_at: DataTypes.DATE,
    },
    {
      sequelize,
      freezeTableName: true,
      tableName: 'Question',
      modelName: 'Question',
      underscored: true,
      paranoid: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at',
    },
  );

  return Question;
};
