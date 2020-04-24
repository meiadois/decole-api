'use strict';
module.exports = (sequelize, DataTypes) => {
  const Marketplace = sequelize.define('Marketplace', {
    name: DataTypes.STRING
  }, {});
  Marketplace.associate = function(models) {
    // associations can be defined here
  };
  return Marketplace;
};