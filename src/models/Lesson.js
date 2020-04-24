'use strict';
module.exports = (sequelize, DataTypes) => {
  const Lesson = sequelize.define('Lesson', {
    title: DataTypes.STRING,
    description: DataTypes.STRING
  }, {});
  Lesson.associate = function(models) {
    // associations can be defined here
  };
  return Lesson;
};