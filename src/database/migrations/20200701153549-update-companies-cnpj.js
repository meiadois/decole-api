'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn(
        'companies',
        'cnpj',
        {
          allowNull: true,
          type: Sequelize.STRING
        }
      ),
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
        queryInterface.changeColumn(
            'companies',
            'cnpj',
            {
              allowNull: false,
              type: Sequelize.STRING
            }
          ),
    ])
  }
}
