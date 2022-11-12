'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('UserCourse', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },

      user_id: {
        allowNull: false,
        type: Sequelize.BIGINT,
      },

      course_id: {
        allowNull: false,
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
    await queryInterface.addConstraint('UserCourse', {
      type: 'FOREIGN KEY',
      fields: ['user_id'],
      references: {
        table: 'User',
        field: 'id',
      },
    });

    await queryInterface.addConstraint('UserCourse', {
      type: 'FOREIGN KEY',
      fields: ['course_id'],
      references: {
        table: 'Course',
        field: 'id',
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('UserCourse');
  },
};
