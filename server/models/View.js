'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class View extends Model {
    static associate(models) {
      View.belongsTo(models.Course, {
        foreignKey: 'video_id',
        as: 'Video',
        targetKey: 'id',
        useJunctionTable: false,
      });
      View.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'User',
        targetKey: 'id',
        useJunctionTable: false,
      });
    }
  }
  View.init(
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
      tableName: 'View',
      modelName: 'View',
      underscored: true,
      paranoid: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at',
    },
  );

  return View;
};
