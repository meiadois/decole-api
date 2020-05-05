'use strict';
const uuid = require('uuid/v4');

module.exports = (sequelize, DataTypes) => {
  const Lesson = sequelize.define('Lesson', {
    title: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    tableName: 'lessons'
  });
  Lesson.associate = function (models) {
    // associations can be defined here
    this.belongsToMany(models.Route, { foreignKey: 'lesson_id', through: 'route_lessons', as: 'routes' });
    this.belongsToMany(models.Channel, { foreignKey: 'lesson_id', through: 'channel_lessons', as: 'channels' });
    this.hasMany(models.Step, { foreignKey: 'lesson_id', as: 'steps' });
    this.hasMany(models.Requirement, { foreignKey: 'required_lesson_id', as: 'requirements' });
    this.hasMany(models.DoneLesson, { foreignKey: 'lesson_id', as: 'done_lessons' });
  };

  Lesson.beforeCreate(lesson => lesson.id = uuid());
  return Lesson;
};