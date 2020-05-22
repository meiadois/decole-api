'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('channels', [
      {
        id: 1,
        name: 'MercadoLivre',
        category: 'Marketplace',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        name: 'Instagram',
        category: 'SocialNetwork',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        name: 'Facebook',
        category: 'SocialNetwork',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        name: 'Twitter',
        category: 'SocialNetwork',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('channels', null, {})
  }
}
