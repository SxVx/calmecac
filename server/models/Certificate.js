'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Certificate extends Model {
    static associate(models) {
      Certificate.hasMany(models.Achievements, {
        foreignKey: 'certificate_id',
        as: 'Achievements',
      });
    }
  }
  Certificate.init(
    {
      address_hash: DataTypes.STRING,
      url_image: DataTypes.STRING,
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
      deleted_at: DataTypes.DATE,
    },
    {
      sequelize,
      freezeTableName: true,
      tableName: 'Certificate',
      modelName: 'Certificate',
      underscored: true,
      paranoid: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at',
    },
  );

  return Certificate;
};
