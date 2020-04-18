'use strict';
module.exports = (sequelize, DataTypes) => {
  const SocialNetwork = sequelize.define('SocialNetwork', {
    name: DataTypes.STRING
  }, {});
  SocialNetwork.associate = function (models) {
    // associations can be defined here
    this.belongsToMany(models.Module, { foreignKey: 'social_network_id', through: 'SocialNetworkModules', as: 'modules' });
    this.belongsToMany(models.User, { foreignKey: 'social_network_id', through: 'UserSocialNetworks', as: 'social_networks' });
  };
  return SocialNetwork;
};