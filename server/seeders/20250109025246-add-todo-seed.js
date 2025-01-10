'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Todos', [
      {
        text: 'Learn JavaScript',
        category: 'Education',
        isCompleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        text: 'Read a book',
        category: 'Hobby',
        isCompleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        text: 'Go to the gym',
        category: 'Health',
        isCompleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    // Remove os dados inseridos anteriormente
    await queryInterface.bulkDelete('Todos', null, {});
  },
};
