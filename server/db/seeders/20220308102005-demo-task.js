'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Tasks', [{
      title: 'Купить хлеб',
      condition: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      title: 'Купить молоко',
      condition: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      title: 'Купить масло',
      condition: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('Task', null, {});
     */
    await queryInterface.bulkDelete('Tasks', null, {});
  }
};
