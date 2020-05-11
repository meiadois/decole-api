'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('segments', [
      {
        id: 1,
        name: 'Alimentos',
      },
      {
        id: 2,
        name: 'Beleza',
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('segments', null, {});
  }
};
