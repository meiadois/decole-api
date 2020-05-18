'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('segments', [
      {
        id: 1,
        name: 'Alimentos',
        createdAt:new Date(),
        updatedAt:new Date(),
      },
      {
        id: 2,
        name: 'Beleza',
        createdAt:new Date(),
        updatedAt:new Date(),
      },
      {
        id: 3,
        name: 'Limpeza',
        createdAt:new Date(),
        updatedAt:new Date(),
      },
      {
        id: 4,
        name: 'Computação',
        createdAt:new Date(),
        updatedAt:new Date(),
      },
      {
        id: 5,
        name: 'Elétrica',
        createdAt:new Date(),
        updatedAt:new Date(),
      },
      {
        id: 6,
        name: 'Educação',
        createdAt:new Date(),
        updatedAt:new Date(),
      },
      {
        id: 7,
        name: 'Software',
        createdAt:new Date(),
        updatedAt:new Date(),
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('segments', null, {});
  }
};
