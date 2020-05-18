'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('route_lessons', [
      {
        id: 1,
        route_id:1,
        lesson_id:1,
        createdAt:new Date(),
        updatedAt:new Date(),
      },
      {
        id: 2,
        route_id:1,
        lesson_id:2,
        createdAt:new Date(),
        updatedAt:new Date(),
      },
      {
        id: 3,
        route_id:1,
        lesson_id:3,
        createdAt:new Date(),
        updatedAt:new Date(),
      },
      {
        id: 4,
        route_id:2,
        lesson_id:4,
        createdAt:new Date(),
        updatedAt:new Date(),
      },
      {
        id: 5,
        route_id:2,
        lesson_id:5,
        createdAt:new Date(),
        updatedAt:new Date(),
      },
      {
        id: 6,
        route_id:2,
        lesson_id:6,
        createdAt:new Date(),
        updatedAt:new Date(),
      },
      {
        id: 7,
        route_id:3,
        lesson_id:7,
        createdAt:new Date(),
        updatedAt:new Date(),
      },
      {
        id: 8,
        route_id:3,
        lesson_id:8,
        createdAt:new Date(),
        updatedAt:new Date(),
      },
      {
        id: 9,
        route_id:3,
        lesson_id:9,
        createdAt:new Date(),
        updatedAt:new Date(),
      },
      {
        id: 10,
        route_id:3,
        lesson_id:10,
        createdAt:new Date(),
        updatedAt:new Date(),
      },
      {
        id: 11,
        route_id:3,
        lesson_id:11,
        createdAt:new Date(),
        updatedAt:new Date(),
      },
      {
        id: 12,
        route_id:3,
        lesson_id:12,
        createdAt:new Date(),
        updatedAt:new Date(),
      },
      {
        id: 13,
        route_id:3,
        lesson_id:13,
        createdAt:new Date(),
        updatedAt:new Date(),
      },
      

      
      
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('route_lessons', null, {});
  }
};