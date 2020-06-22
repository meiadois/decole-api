'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('steps', [

      {
        id: 25,
        message: 'Acesse seu perfil.',
        order: 1,
        lesson_id: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 26,
        message: 'Clique no ícone de Configurações.',
        order: 2,
        lesson_id: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 27,
        message: 'Selecione Conta.',
        order: 3,
        lesson_id: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 28,
        message: 'Clique em Mudar para conta comercial.',
        order: 4,
        lesson_id: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 29,
        message: 'Obs: Somente uma Página do Facebook pode ser conectada à sua conta comercial.',
        order: 5,
        lesson_id: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 30,
        message: 'Inclua os detalhes, como a categoria da conta ou empresa e informações de contato.',
        order: 6,
        lesson_id: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 31,
        message: 'Toque em Concluído.',
        order: 7,
        lesson_id: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      }

    ], {})
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('steps', null, {})
  }
}
