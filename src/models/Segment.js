'use strict';
const uuid = require('uuid/v4');

module.exports = (sequelize, DataTypes) => {
  const Segment = sequelize.define('Segment', {
    name: DataTypes.STRING
  }, {});
  Segment.associate = function (models) {
    // associations can be defined here
    this.hasMany(models.Company, { foreignKey: 'segment_id', as: 'companies' });
  };
  Segment.beforeCreate(m => m.id = uuid());

  return Segment;
};