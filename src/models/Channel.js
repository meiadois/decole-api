'use strict';
const uuid = require('uuid/v4');
module.exports = (sequelize, DataTypes) => {
  const Channel = sequelize.define('Channel', {
    name: DataTypes.STRING,
    category: DataTypes.STRING
  }, {});
  Channel.associate = function(models) {
    // associations can be defined here
    this.belongsToMany(models.Lesson, { foreignKey: 'channel_id', through: 'channel_lessons', as: 'lessons' });
  };
  Channel.beforeCreate(channel => channel.id = uuid());
  return Channel;
};