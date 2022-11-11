'use strict';
const { faker } = require('@faker-js/faker');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'User',
      [
        {
          username: faker.name.firstName(),
          email: faker.internet.email(),
          password: faker.internet.password(),
        },
        {
          username: faker.name.firstName(),
          email: faker.internet.email(),
          password: faker.internet.password(),
        },
        {
          username: faker.name.firstName(),
          email: faker.internet.email(),
          password: faker.internet.password(),
        },
      ],
      {},
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('User', null, {});
  },
};
