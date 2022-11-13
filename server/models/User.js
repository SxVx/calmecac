'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.UserCourse, {
        foreignKey: 'user_id',
        as: 'UserCourse',
      });
      User.hasMany(models.Achievements, {
        foreignKey: 'user_id',
        as: 'Achievements',
      });
      User.hasMany(models.UserCategory, {
        foreignKey: 'user_id',
        as: 'UserCategory',
      });
      User.hasMany(models.View, {
        foreignKey: 'user_id',
        as: 'View',
      });
    }
  }
  User.init(
    {
      username: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        unique: {
          msg: 'This email is already taken.',
        },
        validate: {
          isEmail: {
            msg: 'Email address must be valid.',
          },
        },
      },
      password: DataTypes.STRING,
      role: DataTypes.STRING, // ( creator | consumer )
      wallet_hash: DataTypes.STRING,
      image_url: DataTypes.STRING,
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
      deleted_at: DataTypes.DATE,
    },
    {
      sequelize,
      freezeTableName: true,
      tableName: 'User',
      modelName: 'User',
      underscored: true,
      paranoid: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at',
    },
  );

  return User;
};
