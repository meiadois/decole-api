'use strict';
module.exports = (sequelize, DataTypes) => {
  const Progress = sequelize.define('Progress', {
    done: DataTypes.BOOLEAN
  }, {});
  Progress.associate = function (models) {
    // associations can be defined here
    this.belongsTo(models.Module, { foreignKey: 'module_id', as: 'module' });
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
  };
  return Progress;
};