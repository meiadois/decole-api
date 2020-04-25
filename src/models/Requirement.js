'use strict';
module.exports = (sequelize, DataTypes) => {
  const Requirement = sequelize.define('Requirement', {
  }, {});
  Requirement.associate = function(models) {
    // associations can be defined here
  };
  return Requirement;
};