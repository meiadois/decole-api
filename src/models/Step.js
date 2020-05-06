'use strict';
module.exports = (sequelize, DataTypes) => {
  const Step = sequelize.define('Step', {
    message: DataTypes.STRING,
    order: DataTypes.INTEGER
  }, {
    tableName: 'steps'
  });
  Step.associate = function (models) {
    // associations can be defined here
    this.belongsTo(models.Lesson, { foreignKey: 'lesson_id', as: 'lesson' });
  };
  return Step;
};