'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn('users', 'name', {
          type: Sequelize.STRING
        }, { transaction: t }),
        queryInterface.removeColumn('users', 'username', { transaction: t }),
      ])
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeColumn('users', 'name', { transaction: t }),
      ])
    })
  }
};
