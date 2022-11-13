'use strict';
const { faker } = require('@faker-js/faker');
const {bcryptPassword} = require('./../utils/third-parties/bcryptPassword');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'User',
      [
        {
          username: faker.name.firstName(),
          email: 'correoTest1@calmecac.com',
          password: await bcryptPassword('P4ssw0rd?gX'),
          role: 'consumer',
          wallet_hash: '0123456789',
          image_url: 'Hackathon/user/imagen01.png',
        },
        {
          username: faker.name.firstName(),
          email: 'correoTest2@calmecac.com',
          password: await bcryptPassword('P4ssw0rd?gX'),
          role: 'consumer',
          wallet_hash: '0123456789',
          image_url: 'Hackathon/user/imagen02.png',
        },
        {
          username: faker.name.firstName(),
          email: 'correoTest3@calmecac.com',
          password: await bcryptPassword('P4ssw0rd?gX'),
          role: 'creator',
          wallet_hash: '0123456789',
          image_url: 'Hackathon/user/imagen03.png',
        },
        {
          username: faker.name.firstName(),
          email: 'correoTest4@calmecac.com',
          password: await bcryptPassword('P4ssw0rd?gX'),
          role: 'creator',
          wallet_hash: '0123456789',
          image_url: 'Hackathon/user/imagen04.png',
        },
        {
          username: faker.name.firstName(),
          email: 'correoTest5@calmecac.com',
          password: await bcryptPassword('P4ssw0rd?gX'),
          role: 'creator',
          wallet_hash: '0123456789',
          image_url: 'Hackathon/user/imagen05.png',
        },
      ],
      {},
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('User', null, {});
  },
};
