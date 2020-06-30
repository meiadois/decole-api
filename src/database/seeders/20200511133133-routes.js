'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('routes', [
      {
        id: 1,
        title: 'Instagram I: Primeiros passos',
        description: 'Conheça a rede social que mais cresce no mundo!',
        order: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        title: 'Facebook I: Primeiros passos',
        description: 'Conheça um pouco sobre o Facebook!',
        order: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        title: 'Instagram II: Conta Comercial e Instagram Stories',
        description: 'Multiplique suas vendas com o Instagram!',
        order: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        title: 'Instagram III: Publicações',
        description: 'Conheça mais detalhes do Instagram!',
        order: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      }

    ], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('routes', null, {})
  }
}
