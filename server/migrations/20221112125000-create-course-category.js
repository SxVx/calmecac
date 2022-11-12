'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('CourseCategory', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },
      course_id: {
        allowNull: false,
        type: Sequelize.BIGINT,
      },
      category_id: {
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
    await queryInterface.addConstraint('CourseCategory', {
      type: 'FOREIGN KEY',
      fields: ['course_id'],
      references: {
        table: 'Course',
        field: 'id',
      },
    });

    await queryInterface.addConstraint('CourseCategory', {
      type: 'FOREIGN KEY',
      fields: ['category_id'],
      references: {
        table: 'Category',
        field: 'id',
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('CourseCategory');
  },
};
