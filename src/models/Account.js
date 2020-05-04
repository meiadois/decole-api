'use strict';
const uuid = require('uuid/v4');

module.exports = (sequelize, DataTypes) => {
  const Account = sequelize.define('Account', {
    username: DataTypes.STRING
  }, {});
  Account.associate = function(models) {
    // associations can be defined here
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    this.belongsTo(models.Channel, { foreignKey: 'channel_id', as: 'channel' });
  };
  Account.beforeCreate(m => m.id = uuid());

  return Account;
};