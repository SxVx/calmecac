'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'Category',
      [
        { name: 'Development' },
        { name: 'Business' },
        { name: 'Finance' },
        { name: 'IT' },
        { name: 'Office' },
        { name: 'Personal' },
        { name: 'Design' },
        { name: 'Marketing' },
        { name: 'Health' },
        { name: 'Music' },
      ],
      {},
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Category', null, {});
  },
};
