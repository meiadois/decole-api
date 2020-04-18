'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING
  }, {});
  User.associate = function (models) {
    // associations can be defined here
    this.hasMany(models.Progress, { foreignKey: 'user_id', as: 'progress_list' });
    this.belongsToMany(models.SocialNetwork, { foreignKey: 'user_id', through: 'UserSocialNetworks', as: 'social_networks' });
  };
  return User;
};