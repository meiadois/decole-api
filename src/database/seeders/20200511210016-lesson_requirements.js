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
        required_step_id: 23,
        createdAt: new Date(),
        updatedAt: new Date()
      },

      //route2
      {
        id: 4,
        lesson_id: 6,
        required_lesson_id: 5,
        required_step_id: 38,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        lesson_id: 7,
        required_lesson_id: 6,
        required_step_id: 46,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 6,
        lesson_id: 8,
        required_lesson_id: 7,
        required_step_id: 52,
        createdAt: new Date(),
        updatedAt: new Date()
      },

      //route 3
      {
        id: 7,
        lesson_id: 10,
        required_lesson_id: 9,
        required_step_id: 67,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 8,
        lesson_id: 11,
        required_lesson_id: 10,
        required_step_id: 75,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 9,
        lesson_id: 12,
        required_lesson_id: 11,
        required_step_id: 84,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 10,
        lesson_id: 13,
        required_lesson_id: 12,
        required_step_id: 89,
        createdAt: new Date(),
        updatedAt: new Date()
      },

      //route 4

      {
        id: 11,
        lesson_id: 15,
        required_lesson_id: 14,
        required_step_id: 101,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 12,
        lesson_id: 16,
        required_lesson_id: 15,
        required_step_id: 106,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 13,
        lesson_id: 17,
        required_lesson_id: 16,
        required_step_id: 110,
        createdAt: new Date(),
        updatedAt: new Date()
      },



    ], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('lesson_requirements', null, {})
  }
}
