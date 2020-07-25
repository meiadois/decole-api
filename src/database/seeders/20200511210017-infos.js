'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('infos', [
      {
        name: "appVersion",
        value: "1.0.0",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "underMaintenance",
        value: "false",
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('infos', null, {})
  }
}
