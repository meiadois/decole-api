'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('steps', [
      {
        id: 34,
        message: 'Baixe o aplicativo do Facebook da App Store (iOS) ou da Google Play Store (Android).',
        order: 1,
        lesson_id: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 35,
        message: 'Depois de instalar o aplicativo, toque em []  para abri-lo.',
        order: 2,
        lesson_id: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 36,
        message: 'Toque em Cadastrar-se com email ',
        order: 3,
        lesson_id: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 37,
        message: 'Insira seus dados',
        order: 4,
        lesson_id: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 38,
        message: 'Pronto!.',
        order: 5,
        lesson_id: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },

      ////////////////////////////
      {
        id: 39,
        message: 'Logue no seu Facebook pessoal',
        order: 1,
        lesson_id: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 40,
        message: 'Clique no menu.',
        order: 2,
        lesson_id: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 41,
        message: 'Clique em página.',
        order: 3,
        lesson_id: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 42,
        message: 'Clique em criar página.',
        order: 4,
        lesson_id: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 43,
        message: 'Escolha as categorias para descreve seu negócio.',
        order: 5,
        lesson_id: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 44,
        message: 'Digite o nome de seu negócio..',
        order: 6,
        lesson_id: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 45,
        message: 'Digite o nome do seu site se não tem marque a opção.',
        order: 7,
        lesson_id: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 46,
        message: 'Pronto!.',
        order: 8,
        lesson_id: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      },


      ////////////////////////////
      {
        id: 47,
        message: 'Clique no menu.',
        order: 1,
        lesson_id: 7,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 48,
        message: 'Clique em página.',
        order: 2,
        lesson_id: 7,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 49,
        message: 'Escolha sua página.',
        order: 3,
        lesson_id: 7,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 50,
        message: 'Clique na foto do perfil de sua página.,',
        order: 4,
        lesson_id: 7,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 51,
        message: 'Escolha uma foto.',
        order: 5,
        lesson_id: 7,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 52,
        message: 'Pronto!.',
        order: 6,
        lesson_id: 7,
        createdAt: new Date(),
        updatedAt: new Date()
      },


      ////////////////////////////
      {
        id: 53,
        message: 'Clique no menu.',
        order: 1,
        lesson_id: 8,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 54,
        message: 'Clique em página.',
        order: 2,
        lesson_id: 8,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 55,
        message: 'Escolha sua página.',
        order: 3,
        lesson_id: 8,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 56,
        message: 'Clique na área da capa de sua página.',
        order: 4,
        lesson_id: 8,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 57,
        message: 'Escolha uma foto para a capa.',
        order: 5,
        lesson_id: 8,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 58,
        message: 'Pronto!.',
        order: 6,
        lesson_id: 8,
        createdAt: new Date(),
        updatedAt: new Date()
      },

    ], {})
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('steps', null, {})
  }
}
