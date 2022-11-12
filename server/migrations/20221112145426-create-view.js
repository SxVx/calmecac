'use strict';
// Table many to many:  UserVideo
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('View', {
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
      video_id: {
        allowNull: true,
        type: Sequelize.BIGINT,
      },
      view: {
        defaultValue: true,
        type: Sequelize.BOOLEAN,
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
    await queryInterface.addConstraint('View', {
      type: 'FOREIGN KEY',
      fields: ['video_id'],
      references: {
        table: 'Video',
        field: 'id',
      },
    });
    await queryInterface.addConstraint('View', {
      type: 'FOREIGN KEY',
      fields: ['user_id'],
      references: {
        table: 'User',
        field: 'id',
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('View');
  },
};
