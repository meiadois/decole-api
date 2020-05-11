'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('steps', [
      {
        id: 1,
        message: "Abra o App",
        order: 1,
        lesson_id: 1,
      },
      {
        id: 2,
        message: "Clique em criar conta",
        order: 2,
        lesson_id: 1,
      },
      {
        id: 3,
        message: "Preencha os dados do formulário",
        order: 3,
        lesson_id: 1,
      },
    ], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('steps', null, {});
  }
};
