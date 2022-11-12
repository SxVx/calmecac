'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Comment', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },

      video_id: {
        allowNull: true,
        type: Sequelize.BIGINT,
      },
      comment: {
        allowNull: true,
        type: Sequelize.TEXT,
      },
      comment_id: {
        allowNull: true,
        type: Sequelize.BIGINT,
        comment: 'main comment reference',
      },
      user_id: {
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
    await queryInterface.addConstraint('Comment', {
      type: 'FOREIGN KEY',
      fields: ['video_id'],
      references: {
        table: 'Video',
        field: 'id',
      },
    });
    await queryInterface.addConstraint('Comment', {
      type: 'FOREIGN KEY',
      fields: ['user_id'],
      references: {
        table: 'User',
        field: 'id',
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('Comment');
  },
};
