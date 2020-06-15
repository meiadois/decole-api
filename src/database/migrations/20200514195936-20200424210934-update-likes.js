'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'likes',
        'accepted_at',
        {
          allowNull: true,
          type: Sequelize.DATE
        }
      )
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('likes', 'accepted_at')
    ])
  }
}
