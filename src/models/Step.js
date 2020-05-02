'use strict';
const uuid = require('uuid/v4');

module.exports = (sequelize, DataTypes) => {
  const Step = sequelize.define('Step', {
    message: DataTypes.STRING,
    order : DataTypes.INTEGER
  }, {});
  Step.associate = function(models) {
    // associations can be defined here
    this.belongsTo(models.Lesson, { foreignKey: 'lesson_id', as: 'lesson' });
  };
  Step.beforeCreate(m => m.id = uuid());

  return Step;
};