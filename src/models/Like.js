'use strict';
module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define('Like', {
    sender_id: DataTypes.STRING,
    recipient_id: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    tableName: 'likes'
  });
  Like.associate = function (models) {
    // associations can be defined here
    this.belongsToMany(models.Company, { foreignKey: 'like_id', through: 'company_likes', as: 'companies' });

  };
  return Like;
};