'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'users',
        'paid_access_expiration',
        {
          allowNull: false,
          type: Sequelize.DATE
        }
      )
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('users', 'paid_access_expiration')
    ])
  }
}
