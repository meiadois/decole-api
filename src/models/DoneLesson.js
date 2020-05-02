'use strict';
const uuid = require('uuid/v4');

module.exports = (sequelize, DataTypes) => {
  const DoneLesson = sequelize.define('DoneLesson', {
  }, {
    tableName: 'done_lessons'
  });
  DoneLesson.associate = function (models) {
    // associations can be defined here
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    this.belongsTo(models.Lesson, { foreignKey: 'lesson_id', as: 'lesson' });
  };
  DoneLesson.beforeCreate(doneLesson => doneLesson.id = uuid());

  return DoneLesson;
};