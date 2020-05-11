'use strict';
module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define('Like', {
    status: {
      type: DataTypes.ENUM,
      values: ['pending', 'accepted', 'denied', 'deleted'],
      defaultValue: 'pending'
    }

  }, {
    tableName: 'likes'
  });
  Like.associate = function (models) {
    // associations can be defined here
    this.belongsTo(models.Company, { foreignKey: 'sender_id', as: 'sender_company' });
    this.belongsTo(models.Company, { foreignKey: 'recipient_id', as: 'recipient_company' });

  };
  return Like;
};