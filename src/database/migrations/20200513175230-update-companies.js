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
      ),
      queryInterface.addColumn(
        'companies',
        'banner',
        {
          allowNull: false,
          type: Sequelize.STRING
        },
      ),
      queryInterface.addColumn(
        'companies',
        'city',
        {
          allowNull: false,
          type: Sequelize.STRING
        },
      ),
      queryInterface.addColumn(
        'companies',
        'neighborhood',
        {
          allowNull: false,
          type: Sequelize.STRING
        },
      ),
      queryInterface.addColumn(
        'companies',
        'state',
        {
          allowNull: false,
          type: Sequelize.STRING
        },
      ),
      queryInterface.addColumn(
        'companies',
        'street',
        {
          allowNull: false,
          type: Sequelize.STRING
        },
      ),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('companies', 'cellphone'),
      queryInterface.removeColumn('companies', 'email'),
      queryInterface.removeColumn('companies', 'visible'),
      queryInterface.removeColumn('companies', 'banner'),
      queryInterface.removeColumn('companies', 'city'),
      queryInterface.removeColumn('companies', 'neighborhood'),
      queryInterface.removeColumn('companies', 'state'),
      queryInterface.removeColumn('companies', 'street'),
    ]);
  }
};
