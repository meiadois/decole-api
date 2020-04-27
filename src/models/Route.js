'use strict';
module.exports = (sequelize, DataTypes) => {
  const Route = sequelize.define('Route', {
    description: DataTypes.STRING
  }, {});
  Route.associate = function (models) {
    // associations can be defined here
    this.belongsToMany(models.Lesson, { foreignKey: 'route_id', through: 'route_lessons', as: 'lessons' });
    this.belongsToMany(models.User, { foreignKey: 'route_id', through: 'user_routes', as: 'users' });
    this.hasMany(models.DoneRoute, { foreignKey: 'route_id', as: 'done_routes' });
  };
  return Route;
};