'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('likes', 'sender_id', {
        type: Sequelize.INTEGER
      }),
      queryInterface.changeColumn('likes', 'recipient_id', {
        type: Sequelize.INTEGER
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
