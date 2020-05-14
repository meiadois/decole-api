'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'companies',
        'cellphone',
        {
          allowNull: false,
          type: Sequelize.STRING
        },
      ),
      queryInterface.addColumn(
        'companies',
        'email',
        {
          allowNull: false,
          type: Sequelize.STRING
        },
      ),
      queryInterface.addColumn(
        'companies',
        'visible',
        {
          allowNull: false,
          type: Sequelize.BOOLEAN,
          defaultValue: true,
        },
      )
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('companies', 'cellphone'),
      queryInterface.removeColumn('companies', 'email'),
      queryInterface.removeColumn('companies', 'visible'),

    ]);
  }
};
