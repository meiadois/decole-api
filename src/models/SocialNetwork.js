'use strict';
module.exports = (sequelize, DataTypes) => {
  const SocialNetwork = sequelize.define('SocialNetwork', {
    name: DataTypes.STRING
  }, {});
  SocialNetwork.associate = function(models) {
    // associations can be defined here
  };
  return SocialNetwork;
};