'use strict';
module.exports = (sequelize, DataTypes) => {
  const Module = sequelize.define('Module', {
    code: DataTypes.STRING,
    description: DataTypes.STRING
  }, {});
  Module.associate = function (models) {
    // associations can be defined here
    this.hasMany(models.Step, { foreignKey: 'module_id', as: 'steps' });
    this.hasMany(models.Progress, { foreignKey: 'module_id', as: 'progress_list' });
    this.belongsToMany(models.SocialNetwork, { foreignKey: 'module_id', through: 'SocialNetworkModules', as: 'social_networks' });
  };
  return Module;
};