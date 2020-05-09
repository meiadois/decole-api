'use strict';
module.exports = (sequelize, DataTypes) => {
  const Route = sequelize.define('Route', {
    title: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    tableName: 'routes'
  });
  Route.associate = function (models) {
    // associations can be defined here
    this.belongsToMany(models.Lesson, { foreignKey: 'route_id', through: 'route_lessons', as: 'lessons' });
    this.belongsToMany(models.User, { foreignKey: 'route_id', through: 'user_routes', as: 'users' });
    this.belongsToMany(models.Channel, { foreignKey: 'route_id', through: 'channel_routes', as: 'channels' });
    this.hasMany(models.DoneRoute, { foreignKey: 'route_id', as: 'done_routes' });
  };
  return Route;
};