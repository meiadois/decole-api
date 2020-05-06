'use strict';
module.exports = (sequelize, DataTypes) => {
  const Channel = sequelize.define('Channel', {
    name: DataTypes.STRING,
    category: DataTypes.STRING
  }, {
    tableName: 'channels'
  });
  Channel.associate = function (models) {
    // associations can be defined here
    this.belongsToMany(models.Lesson, { foreignKey: 'channel_id', through: 'channel_lessons', as: 'lessons' });
    this.hasMany(models.Account, { foreignKey: 'channel_id', as: 'accounts' });
  };
  return Channel;
};