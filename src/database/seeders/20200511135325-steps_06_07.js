'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('steps', [
      {
        id: 40,
        message: 'Abra o Instagram.',
        order: 1,
        lesson_id: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 41,
        message: ' Acesse a tela inicial.',
        order: 2,
        lesson_id: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 42,
        message: 'Clique na câmera no canto superior esquerdo.',
        order: 3,
        lesson_id: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 43,
        message: 'Agora você está com o Stories aberto.',
        order: 4,
        lesson_id: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 44,
        message: 'Clique no botão branco para tirar uma foto. Mantenha-o pressionado para criar um vídeo ou...',
        order: 5,
        lesson_id: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 45,
        message: 'Deslize o dedo para cima da tela para compartilhar foto e vídeo da sua galeria.',
        order: 6,
        lesson_id: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 46,
        message: 'Clique no canto inferior escrito “ao vivo” para compartilhar vídeo em tempo real.',
        order: 7,
        lesson_id: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 47,
        message: 'Clique no canto inferior escrito “texto” para compartilhar algo escrito.',
        order: 8,
        lesson_id: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // lesson7

      {
        id: 48,
        message: 'Abra o Instagram.',
        order: 1,
        lesson_id: 7,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 49,
        message: ' Acesse a tela inicial.',
        order: 2,
        lesson_id: 7,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 50,
        message: 'Clique na câmera no canto superior esquerdo.',
        order: 3,
        lesson_id: 7,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 51,
        message: 'Agora você está com o Stories aberto.',
        order: 4,
        lesson_id: 7,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 52,
        message: 'Tire uma foto, faça um vídeo, faça um boomerang, o que desejar.',
        order: 5,
        lesson_id: 7,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 53,
        message: 'Clique no ícone de carinha sorrindo localizado canto superior direito.',
        order: 6,
        lesson_id: 7,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 54,
        message: 'Veja os Stickers disponíveis e clique em um para escolher.',
        order: 7,
        lesson_id: 7,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 55,
        message: 'Aumente ou diminua o tamanho do Sticker se desejar.',
        order: 8,
        lesson_id: 7,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 94,
        message: 'Pronto!.',
        order: 9,
        lesson_id: 7,
        createdAt: new Date(),
        updatedAt: new Date()
      }

    ], {})
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('steps', null, {})
  }
}
