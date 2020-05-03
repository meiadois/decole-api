'use strict';
const uuid = require('uuid/v4');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});
  User.associate = function (models) {
    // associations can be defined here
    this.belongsToMany(models.Route, { foreignKey: 'user_id', through: 'user_routes', as: 'routes' });
    this.belongsToMany(models.Company, { foreignKey: 'user_id', through: 'user_companies', as: 'companies' });
    this.hasMany(models.DoneLesson, { foreignKey: 'user_id', as: 'done_lessons' });
    this.hasMany(models.DoneRoute, { foreignKey: 'user_id', as: 'done_routes' });
    this.hasMany(models.Account, { foreignKey: 'user_id', as: 'accounts' });
  };
  User.beforeCreate(m => m.id = uuid());

  return User;
};