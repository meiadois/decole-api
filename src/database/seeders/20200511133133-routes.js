'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('routes', [
      {
        id: 1,
        title: 'Instagram parte 1: primeiros passos',
        description: 'Conheça a rede social que mais cresce no mundo!',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        title: 'Facebook parte 1: primeiros passos',
        description: 'Conheça um pouco sobre o Facebook!',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        title: 'Instagram parte 2: Conta Comercial e Instagram Stories',
        description: 'Multiplique suas vendas com o Instagram!',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        title: 'Instagram parte 3: Publicações',
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
