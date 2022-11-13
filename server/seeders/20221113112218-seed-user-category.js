'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'UserCategory',
      [
        { user_id: 1, category_id: 3 },
        { user_id: 1, category_id: 1 },
        { user_id: 1, category_id: 4 },
        { user_id: 2, category_id: 3 },
        { user_id: 2, category_id: 7 },
        { user_id: 2, category_id: 8 },
        { user_id: 3, category_id: 9 },
        { user_id: 3, category_id: 1 },
        { user_id: 4, category_id: 2 },
        { user_id: 4, category_id: 6 },
        { user_id: 5, category_id: 9 },
      ],
      {},
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('UserCategory', null, {});
  },
};
