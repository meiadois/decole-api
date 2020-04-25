'use strict';
module.exports = (sequelize, DataTypes) => {
  const Step = sequelize.define('Step', {
    message: DataTypes.STRING,
    order : DataTypes.INTEGER
  }, {});
  Step.associate = function(models) {
    // associations can be defined here
  };
  return Step;
};