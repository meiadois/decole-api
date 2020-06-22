'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('steps', [
      {
        id: 32,
        message: 'Acesse seu perfil.',
        order: 1,
        lesson_id: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 33,
        message: 'BIO é o espaço onde sua empresa terá para descrever de forma breve o que é ou do que se trata o perfil.',
        order: 2,
        lesson_id: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 34,
        message: 'Esse espaço possui apenas 150 caracteres.',
        order: 3,
        lesson_id: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 35,
        message: 'Exponha claramente o objetivo do perfil.',
        order: 4,
        lesson_id: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 36,
        message: 'Deixe clara a personalidade da empresa.',
        order: 5,
        lesson_id: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 37,
        message: 'Onde a empresa está? Inclua endereço ou localização.',
        order: 6,
        lesson_id: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 38,
        message: 'Direcione através de um link clicável..',
        order: 7,
        lesson_id: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 39,
        message: 'Mobilize através de uma frase convite exemplo: Visite nossa página!.',
        order: 8,
        lesson_id: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      }

    ], {})
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('steps', null, {})
  }
}
