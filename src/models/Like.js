'use strict';
module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define('Like', {
    sender_id: DataTypes.STRING,
    recipient_id: DataTypes.STRING,
    status: DataTypes.STRING
  }, {});
  Like.associate = function(models) {
    // associations can be defined here
  };
  return Like;
};