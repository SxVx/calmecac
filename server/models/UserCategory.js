'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserCategory extends Model {
    static associate(models) {
      UserCategory.belongsTo(models.Category, {
        foreignKey: 'category_id',
        as: 'Category',
        targetKey: 'id',
        useJunctionTable: false,
      });
      UserCategory.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'User',
        targetKey: 'id',
        useJunctionTable: false,
      });
    }
  }
  UserCategory.init(
    {
      user_id: DataTypes.INTEGER,
      category_id: DataTypes.INTEGER,
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
      deleted_at: DataTypes.DATE,
    },
    {
      sequelize,
      freezeTableName: true,
      tableName: 'UserCategory',
      modelName: 'UserCategory',
      underscored: true,
      paranoid: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at',
    },
  );

  return UserCategory;
};
