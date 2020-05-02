'use strict';
const uuid = require('uuid/v4');

module.exports = (sequelize, DataTypes) => {
  const DoneRoute = sequelize.define('DoneRoute', {
  }, {
    tableName: 'done_routes'
  });
  DoneRoute.associate = function (models) {
    // associations can be defined here
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    this.belongsTo(models.Route, { foreignKey: 'route_id', as: 'route' });
  };
  DoneRoute.beforeCreate(m => m.id = uuid());

  return DoneRoute;
};