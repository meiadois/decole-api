'use strict';
module.exports = (sequelize, DataTypes) => {
  const Route = sequelize.define('Route', {
    description: DataTypes.STRING
  }, {});
  Route.associate = function(models) {
    // associations can be defined here
    this.belongsToMany(models.Step, { foreignKey: 'route_id', through: 'route_lessons', as: 'steps' });
    this.belongsToMany(models.User, { foreignKey: 'route_id', through: 'user_routes', as: 'users' });
  };
  return Route;
};