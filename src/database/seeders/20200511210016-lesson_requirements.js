'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('lesson_requirements', [
      {
        id: 1,
        lesson_id: 2,
        required_lesson_id: 1,
        required_step_id: 11,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        lesson_id: 3,
        required_lesson_id: 2,
        required_step_id: 17,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        lesson_id: 4,
        required_lesson_id: 3,
        required_step_id: 24,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        lesson_id: 5,
        required_lesson_id: 4,
        required_step_id: 31,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        lesson_id: 6,
        required_lesson_id: 5,
        required_step_id: 39,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 6,
        lesson_id: 7,
        required_lesson_id: 6,
        required_step_id: 47,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 7,
        lesson_id: 8,
        required_lesson_id: 7,
        required_step_id: 55,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 8,
        lesson_id: 9,
        required_lesson_id: 8,
        required_step_id: 60,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 9,
        lesson_id: 10,
        required_lesson_id: 9,
        required_step_id: 66,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 10,
        lesson_id: 11,
        required_lesson_id: 10,
        required_step_id: 72,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 11,
        lesson_id: 12,
        required_lesson_id: 11,
        required_step_id: 77,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 12,
        lesson_id: 13,
        required_lesson_id: 12,
        required_step_id: 85,
        createdAt: new Date(),
        updatedAt: new Date()
      }

    ], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('lesson_requirements', null, {})
  }
}
