'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('steps', [
      {
        id: 18,
        message: 'Abra o App.',
        order: 1,
        lesson_id: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 19,
        message: 'Clique no seu perfil.',
        order: 2,
        lesson_id: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 20,
        message: 'Clique em editar perfil.',
        order: 3,
        lesson_id: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 21,
        message: 'Clique em alterar foto do perfil.',
        order: 4,
        lesson_id: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 22,
        message: 'Escolha a foto.',
        order: 5,
        lesson_id: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 23,
        message: 'Pronto!',
        order: 6,
        lesson_id: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },

    ], {})
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('steps', null, {})
  }
}
