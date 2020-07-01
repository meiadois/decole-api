'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'users',
        'role',
        {
          allowNull: false,
          type: Sequelize.STRING,
          defaultValue : 'user'
        }
      )
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('users', 'role')
    ])
  }
}
