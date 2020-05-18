'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('lessons', [
      // routes 1 instagram
      {
        id: 1,
        title: 'Como criar conta no Instagram.',
        createdAt:new Date(),
        updatedAt:new Date(),
      },
      {
        id: 2,
        title: 'Como mudar as informações de sua bio.',
        createdAt:new Date(),
        updatedAt:new Date(),
      },
      {
        id: 3,
        title: 'Como muda a foto do seu perfil.',
        createdAt:new Date(),
        updatedAt:new Date(),
      },
      
      // routes 2 facebook e conexão
      {
        id: 4,
        title: 'Como criar um perfil comercial e não um perfil pessoal.',
        createdAt:new Date(),
        updatedAt:new Date(),
      },
      {
        id: 5,
        title:'Como muda a foto do seu perfil.',
        createdAt:new Date(),
        updatedAt:new Date(),
      },
      {
        id: 6,
        title: 'Como mudar a foto de capa.',
        createdAt:new Date(),
        updatedAt:new Date(),
      },
      //routes 3 publicações no instagram e conta comercial
      
      {
        id: 7,
        title: 'Como transformar sua conta em comercial.',
        createdAt:new Date(),
        updatedAt:new Date(),
      },
      {
        id: 8,
        title: 'Proporções ideais para suas publicações.',
        createdAt:new Date(),
        updatedAt:new Date(),
      },
      {
        id: 9,
        title: 'Como criar #umahashtagperfeita.',
        createdAt:new Date(),
        updatedAt:new Date(),
      },
      {
        id: 10,
        title: 'Como fazer um story.',
        createdAt:new Date(),
        updatedAt:new Date(),
      },
      {
        id: 11,
        title: 'Como postar um vídeo.',
        createdAt:new Date(),
        updatedAt:new Date(),
      },
      {
        id: 12,
        title: 'Como escolher a capa do vídeo.',
        createdAt:new Date(),
        updatedAt:new Date(),
      },

      {
        id: 13,
        title: 'Como fazer uma publicação na timeline.',
        createdAt:new Date(),
        updatedAt:new Date(),
      },
      
    ], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('lessons', null, {});
  }
};
