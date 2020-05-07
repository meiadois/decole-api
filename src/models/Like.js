'use strict';
module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define('Like', {
    status: DataTypes.STRING
  }, {
    tableName: 'likes'
  });
  Like.associate = function (models) {
    // associations can be defined here
    this.belongsTo(models.User, { foreignKey: 'sender_id', as: 'sender_user' });
    this.belongsTo(models.User, { foreignKey: 'recipient_id', as: 'recipient_user' });
    this.belongsToMany(models.Company, { foreignKey: 'like_id', through: 'company_likes', as: 'companies' });

  };
  return Like;
};