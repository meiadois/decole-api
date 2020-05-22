'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('lesson_requirements', [
      {
        id: 1,
        lesson_id: 2,
        required_lesson_id: 1,
        required_step_id: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        lesson_id: 3,
        required_lesson_id: 2,
        required_step_id: 9,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        lesson_id: 4,
        required_lesson_id: 3,
        required_step_id: 12,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        lesson_id: 5,
        required_lesson_id: 4,
        required_step_id: 19,
        createdAt: new Date(),
        updatedAt: new Date()
      }

    ], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('lesson_requirements', null, {})
  }
}
