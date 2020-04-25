'use strict';
module.exports = (sequelize, DataTypes) => {
  const Company = sequelize.define('Company', {
    name: DataTypes.STRING,
    cep: DataTypes.STRING,
    thumbnail: DataTypes.STRING,
    cnpj: DataTypes.STRING
  }, {});
  Company.associate = function(models) {
    // associations can be defined here
    this.belongsToMany(models.Like, { foreignKey: 'company_id', through: 'company_likes', as: 'likes' });
    this.hasOne(models.Segment, {as: 'segment'});
  };
  return Company;
};