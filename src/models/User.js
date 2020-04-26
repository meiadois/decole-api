'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    this.belongsToMany(models.Route, { foreignKey: 'user_id', through: 'user_routes', as: 'routes' });
    this.belongsTo(models.Company, {as: 'company'});
  };
  return User;
};