'use strict';
module.exports = (sequelize, DataTypes) => {
  const Requirement = sequelize.define('Requirement', {
  }, {});
  Requirement.associate = function(models) {
    // associations can be defined here
    this.belongsTo(models.Lesson, { foreignKey: 'lesson_id', as: '_lesson' });
    this.belongsTo(models.Lesson, {as: 'lesson'});
    this.belongsTo(models.Step, {as: 'step'});
  };
  return Requirement;
};