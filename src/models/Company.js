'use strict';
module.exports = (sequelize, DataTypes) => {
  const Company = sequelize.define('Company', {
    name: DataTypes.STRING,
    cep: DataTypes.STRING,
    thumbnail: DataTypes.STRING,
    cnpj: DataTypes.STRING,
    cellphone: DataTypes.STRING,
    email: DataTypes.STRING,
    description: DataTypes.STRING,
    visible: DataTypes.BOOLEAN,
  }, {
    tableName: 'companies'
  });
  Company.associate = function (models) {
    // associations can be defined here
    // TODO Ajustar relação 1 x N 
    this.belongsTo(models.Segment, { foreignKey: 'segment_id', as: 'segment' });
    this.belongsToMany(models.User, { foreignKey: 'company_id', through: 'user_companies', as: 'users' });
    this.hasMany(models.Like, { foreignKey: 'sender_id', as: 'sent_likes' });
    this.hasMany(models.Like, { foreignKey: 'recipient_id', as: 'received_likes' });
  };
  return Company;
};