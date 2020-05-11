'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('channels', [
      {
        id: 1,
        name: 'MercadoLivre',
        category: 'Marketplace'
      },
      {
        id: 2,
        name: 'Instagram',
        category: 'SocialNetwork'
      },
      {
        id: 3,
        name: 'Facebook',
        category: 'SocialNetwork'
      },
      {
        id: 4,
        name: 'Twitter',
        category: 'SocialNetwork'
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('channels', null, {});
  }
};
