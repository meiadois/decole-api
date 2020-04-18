'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Steps', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      module_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Modules', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      text: {
        type: Sequelize.STRING
      },
      distanceX: {
        type: Sequelize.STRING
      },
      distanceY: {
        type: Sequelize.STRING
      },
      isRelativeMaxX: {
        type: Sequelize.BOOLEAN
      },
      isRelativeMaxY: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Steps');
  }
};