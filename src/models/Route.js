'use strict';
module.exports = (sequelize, DataTypes) => {
  const Route = sequelize.define('Route', {
    description: DataTypes.STRING
  }, {});
  Route.associate = function(models) {
    // associations can be defined here
  };
  return Route;
};