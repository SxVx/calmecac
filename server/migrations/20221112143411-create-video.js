'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Video', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },

      content_url: {
        allowNull: true,
        type: Sequelize.TEXT,
      },

      course_id: {
        allowNull: true,
        type: Sequelize.BIGINT,
      },

      order_in_course: {
        allowNull: null,
        type: Sequelize.INTEGER,
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
    await queryInterface.addConstraint('Video', {
      type: 'FOREIGN KEY',
      fields: ['course_id'],
      references: {
        table: 'Course',
        field: 'id',
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('Video');
  },
};
