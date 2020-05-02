'use strict';
const uuid = require('uuid/v4');

module.exports = (sequelize, DataTypes) => {
  const Requirement = sequelize.define('Requirement', {
  }, {});
  Requirement.associate = function(models) {
    // associations can be defined here
    this.belongsTo(models.Lesson, { foreignKey: 'lesson_id', as: 'lesson' });
    this.belongsTo(models.Lesson, { foreignKey: 'required_lesson_id', as: 'required_lesson' });
    this.belongsTo(models.Step, {foreignKey: 'required_step_id', as: 'required_step'});
  };
  Requirement.beforeCreate(m => m.id = uuid());

  return Requirement;
};