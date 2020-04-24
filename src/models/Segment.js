'use strict';
module.exports = (sequelize, DataTypes) => {
  const Segment = sequelize.define('Segment', {
    name: DataTypes.STRING
  }, {});
  Segment.associate = function(models) {
    // associations can be defined here
  };
  return Segment;
};