'use strict';
// Table many to many:  CourseCertificate
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Achievements', {
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
      course_id: {
        allowNull: false,
        type: Sequelize.BIGINT,
      },
      user_id: {
        allowNull: false,
        type: Sequelize.BIGINT,
      },
      certificate_id: {
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
    await queryInterface.addConstraint('Achievements', {
      type: 'FOREIGN KEY',
      fields: ['user_id'],
      references: {
        table: 'User',
        field: 'id',
      },
    });

    await queryInterface.addConstraint('Achievements', {
      type: 'FOREIGN KEY',
      fields: ['course_id'],
      references: {
        table: 'Course',
        field: 'id',
      },
    });

    await queryInterface.addConstraint('Achievements', {
      type: 'FOREIGN KEY',
      fields: ['certificate_id'],
      references: {
        table: 'Certificate',
        field: 'id',
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('Achievements');
  },
};
