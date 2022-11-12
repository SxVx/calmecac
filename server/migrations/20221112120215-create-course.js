'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Course', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },
      name: {
        allowNull: true,
        type: Sequelize.TEXT,
      },
      description: {
        allowNull: true,
        type: Sequelize.TEXT,
      },
      image_url: {
        allowNull: true,
        type: Sequelize.TEXT,
      },
      created_by: {
        allowNull: true,
        type: Sequelize.BIGINT,
        comment: 'course creator user',
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
    await queryInterface.addConstraint('Course', {
      type: 'FOREIGN KEY',
      fields: ['created_by'],
      references: {
        table: 'User',
        field: 'id',
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('Course');
  },
};
