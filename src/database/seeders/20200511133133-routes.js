'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('routes', [
      {
        id: 1,
        title: 'Primeiros passos no Instagram',
        description: 'Aprenda como apresentar seu negocio no Instagram',
      },
      {
        id: 2,
        title: 'Primeiros passos no Facebook',
        description: 'Aprenda como apresentar seu negocio no Facebook',
      },
      {
        id: 3,
        title: 'Primeiros passos no MercadoLivre',
        description: 'Aprenda como apresentar seu negocio no MercadoLivre',
      },
      {
        id: 4,
        title: 'Primeiros passos no Twitter',
        description: 'Aprenda como apresentar seu negocio no Twitter',
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('routes', null, {});
  }
};
