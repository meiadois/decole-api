'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'routes',
        'order',
        {
          allowNull: false,
          type: Sequelize.INTEGER
        }
      )
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('routes', 'order')
    ])
  }
}
