'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('requirements', [
      {
        id: 1,
        lesson_id: 2,
        required_lesson_id: 1,
        step_order: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        lesson_id: 3,
        required_lesson_id: 2,
        step_order: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        lesson_id: 4,
        required_lesson_id: 3,
        step_order: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        lesson_id: 5,
        required_lesson_id: 3,
        step_order: 8,
        createdAt: new Date(),
        updatedAt: new Date(),
      },





    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('requirements', null, {});
  }
};