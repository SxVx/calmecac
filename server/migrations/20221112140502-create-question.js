'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Question', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },

      question: {
        allowNull: true,
        type: Sequelize.TEXT,
      },
      answer: {
        allowNull: true,
        type: Sequelize.TEXT,
      },
      quiz_id: {
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
    await queryInterface.addConstraint('Question', {
      type: 'FOREIGN KEY',
      fields: ['quiz_id'],
      references: {
        table: 'Quiz',
        field: 'id',
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('Question');
  },
};
