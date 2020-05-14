'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    introduced: DataTypes.BOOLEAN,
    paid_access_expiration: DataTypes.DATE,
  }, {
    tableName: 'users'
  });
  User.associate = function (models) {
    // associations can be defined here
    this.belongsToMany(models.Route, { foreignKey: 'user_id', through: 'user_routes', as: 'routes' });
    this.belongsToMany(models.Company, { foreignKey: 'user_id', through: 'user_companies', as: 'companies' });
    this.hasMany(models.DoneLesson, { foreignKey: 'user_id', as: 'done_lessons' });
    this.hasMany(models.DoneRoute, { foreignKey: 'user_id', as: 'done_routes' });
    this.hasMany(models.Account, { foreignKey: 'user_id', as: 'accounts' });
    this.hasMany(models.Payment, { foreignKey: 'user_id', as: 'payments' });
    //this.hasOne(models.ResetPassword, { foreignKey: 'user_id', as: 'reset_password' });
  };
  return User;
};