'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Achievements extends Model {
    static associate(models) {
      Achievements.belongsTo(models.Course, {
        foreignKey: 'course_id',
        as: 'Course',
        targetKey: 'id',
        useJunctionTable: false,
      });
      Achievements.belongsTo(models.Certificate, {
        foreignKey: 'certificate_id',
        as: 'Certificate',
        targetKey: 'id',
        useJunctionTable: false,
      });
      Achievements.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'User',
        targetKey: 'id',
        useJunctionTable: false,
      });
    }
  }
  Achievements.init(
    {
      name: DataTypes.STRING,
      course_id: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
      certificate_id: DataTypes.INTEGER,
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
      deleted_at: DataTypes.DATE,
    },
    {
      sequelize,
      freezeTableName: true,
      tableName: 'Achievements',
      modelName: 'Achievements',
      underscored: true,
      paranoid: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at',
    },
  );

  return Achievements;
};
