'use strict';
const uuid = require('uuid/v4');

module.exports = (sequelize, DataTypes) => {
  const Company = sequelize.define('Company', {
    name: DataTypes.STRING,
    cep: DataTypes.STRING,
    thumbnail: DataTypes.STRING,
    cnpj: DataTypes.STRING
  }, {});
  Company.associate = function (models) {
    // associations can be defined here
    this.belongsToMany(models.Like, { foreignKey: 'company_id', through: 'company_likes', as: 'likes' });
    // TODO Ajustar relação 1 x N 
    this.belongsTo(models.Segment, { foreignKey: 'segment_id', as: 'segment' });
    this.belongsToMany(models.User, { foreignKey: 'company_id', through: 'user_companies', as: 'users' });
  };

  Company.beforeCreate(m => m.id = uuid());

  return Company;
};