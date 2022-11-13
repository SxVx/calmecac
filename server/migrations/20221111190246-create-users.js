'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('User', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },
      username: {
        allowNull: true,
        type: Sequelize.STRING(30),
      },
      email: {
        allowNull: true,
        type: Sequelize.STRING,
        unique: true,
      },
      password: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      role: {
        allowNull: true,
        type: Sequelize.STRING(10),
      },
      wallet_hash: {
        allowNull: true,
        type: Sequelize.TEXT,
      },
      image_url: {
        allowNull: true,
        type: Sequelize.TEXT,
        comment: 'profile picture',
      },

      created_at: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      },
      updated_at: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      },
      deleted_at: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('User');
  },
};
