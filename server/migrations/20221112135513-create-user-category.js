'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('UserCategory', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },
      user_id: {
        allowNull: true,
        type: Sequelize.BIGINT,
      },
      category_id: {
        allowNull: true,
        type: Sequelize.BIGINT,
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

    // Foreign Keys
    await queryInterface.addConstraint('UserCategory', {
      type: 'FOREIGN KEY',
      fields: ['user_id'],
      references: {
        table: 'User',
        field: 'id',
      },
    });
    await queryInterface.addConstraint('UserCategory', {
      type: 'FOREIGN KEY',
      fields: ['category_id'],
      references: {
        table: 'Category',
        field: 'id',
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('UserCategory');
  },
};
