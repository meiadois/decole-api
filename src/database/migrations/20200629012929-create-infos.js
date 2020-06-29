'use strict'
const uuid = require('uuid/v4')
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('infos', {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
      },
      value: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('infos')
  }
}
