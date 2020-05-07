'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('likes', 'sender_id', {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      }),
      queryInterface.changeColumn('likes', 'recipient_id', {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      })
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('likes', 'sender_id', {
        allowNull: false,
        type: Sequelize.STRING
      }),
      queryInterface.changeColumn('likes', 'recipient_id', {
        allowNull: false,
        type: Sequelize.STRING
      })
    ]);
  }
};
