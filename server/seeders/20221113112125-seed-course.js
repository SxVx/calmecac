'use strict';
const { Course } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await Course.create(
      {
        name: 'Course 1',
        description: 'This is the first course in the app',
        image_url: 'Hackathon/course/course01.jpg',
        CourseCategory: [{ category_id: 1 }, { category_id: 5 }, { category_id: 7 }],
        Video: [
          {
            order_in_course: 1,
            content_url: 'Hackathon/video/Curso1/Tokenomics_1.mp4',
          },
          {
            order_in_course: 2,
            content_url: 'Hackathon/video/Curso1/Tokenomics_2.mp4',
          },
          {
            order_in_course: 3,
            content_url: 'Hackathon/video/Curso1/Tokenomics_3.mp4',
          },
          {
            order_in_course: 4,
            content_url: 'Hackathon/video/Curso1/Tokenomics_4.mp4',
          },
        ],
      },
      {
        include: ['CourseCategory', 'Video'],
      },
    );

    await Course.create(
      {
        name: 'Course 2',
        description: 'This is the second course in the app',
        image_url: 'Hackathon/course/course02.jpg',
        CourseCategory: [{ category_id: 3 }, { category_id: 2 }, { category_id: 6 }],
      },
      {
        include: ['CourseCategory'],
      },
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Course', null, {});
  },
};
