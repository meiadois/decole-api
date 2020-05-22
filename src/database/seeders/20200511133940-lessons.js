'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('lessons', [
      // routes 1 instagram
      {
        id: 1,
        title: 'Como criar conta no Instagram.',
        route_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        title: 'Como mudar as informações de sua bio.',
        route_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        title: 'Como muda a foto do seu perfil.',
        route_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // routes 2 facebook e conexão
      {
        id: 4,
        title: 'Como criar um perfil comercial e não um perfil pessoal.',
        route_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        title: 'Como muda a foto do seu perfil.',
        route_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 6,
        route_id: 2,
        title: 'Como mudar a foto de capa.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // routes 3 publicações no instagram e conta comercial

      {
        id: 7,
        title: 'Como transformar sua conta em comercial.',
        route_id: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 8,
        title: 'Proporções ideais para suas publicações.',
        route_id: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 9,
        title: 'Como criar #umahashtagperfeita.',
        route_id: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 10,
        title: 'Como fazer um story.',
        route_id: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 11,
        title: 'Como postar um vídeo.',
        route_id: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 12,
        title: 'Como escolher a capa do vídeo.',
        route_id: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },

      {
        id: 13,
        title: 'Como fazer uma publicação na timeline.',
        route_id: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }

    ], {})
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('lessons', null, {})
  }
}
