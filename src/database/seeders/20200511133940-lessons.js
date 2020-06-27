'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('lessons', [
      // routes 1 instagram
      {
        id: 1,
        title: 'Como funciona o Instagram?',
        route_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        route_id: 1,
        title: 'Crie uma conta no Instagram pelo aplicativo',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        route_id: 1,
        title: 'Como mudar a foto do seu perfil',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        route_id: 1,
        title: 'Como estruturar sua Bio',
        createdAt: new Date(),
        updatedAt: new Date()
      },


      // routes 2 
      {
        id: 5,
        title: 'Como crie uma conta no Facebook pelo aplicativo.',
        route_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 6,
        route_id: 2,
        title: 'Como criar um página comercial',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 7,
        route_id: 2,
        title: 'Como muda a foto do seu página',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 8,
        route_id: 2,
        title: 'Como mudar uma foto de capa',
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // rota 3 
      {
        id: 9,
        route_id: 3,
        title: 'Como alterar o perfil do Instagram para conta comercial',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 10,
        route_id: 3,
        title: 'Instagram Stories',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 11,
        route_id: 3,
        title: 'Instagram Stories: stickers',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 12,
        route_id: 3,
        title: 'Instagram Stories: música',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 13,
        route_id: 3,
        title: 'Instagram Stories: links',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // route 4
      {
        id: 14,
        route_id: 4,
        title: 'Como criar #umahashtagperfeita',
        createdAt: new Date(),
        updatedAt: new Date()
      },

      {
        id: 15,
        route_id: 4,
        title: 'Planejar as suas publicações',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 16,
        route_id: 4,
        title: 'Tamanhos ideais para o Instagram',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 17,
        route_id: 4,
        title: 'Dicas de conteúdo',
        createdAt: new Date(),
        updatedAt: new Date()
      }

    ], {})
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('lessons', null, {})
  }
}
