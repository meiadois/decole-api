'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('lessons', [
      {
        id: 1,
        title: 'Como criar conta no Instagram',
      },
      {
        id: 2,
        title: 'Como mudar a sua Bio',
      },
      {
        id: 3,
        title: 'Como transformar sua conta em Comercial',
      },
    ], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('lessons', null, {});
  }
};
