'use strict';
module.exports = (sequelize, DataTypes) => {
  const Step = sequelize.define('Step', {
    text: DataTypes.STRING,
    distanceX: DataTypes.STRING,
    distanceY: DataTypes.STRING,
    isRelativeMaxX: DataTypes.BOOLEAN,
    isRelativeMaxY: DataTypes.BOOLEAN
  }, {});
  Step.associate = function (models) {
    // associations can be defined here
    this.belongsTo(models.Module, { foreignKey: 'module_id', as: 'module' });
  };
  return Step;
};