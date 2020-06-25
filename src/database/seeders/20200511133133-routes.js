'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('routes', [
      {
        id: 1,
        title: 'Instagram | Iniciante',
        description: 'Conheça a rede social que mais cresce no mundo!',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        title: 'Instagram | Médio',
        description: 'Multiplique suas vendas com o Instagram!',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        title: 'Instagram | Avançado',
        description: 'Conheça mais detalhes do Instagram!',
        createdAt: new Date(),
        updatedAt: new Date()
      }

    ], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('routes', null, {})
  }
}
