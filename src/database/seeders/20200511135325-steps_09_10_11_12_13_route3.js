'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('steps', [

      // alterando para conta comercial
      {
        id: 59,
        message: 'Acesse seu perfil.',
        order: 1,
        lesson_id: 9,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 60,
        message: 'Clique no ícone de Configurações.',
        order: 2,
        lesson_id: 9,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 61,
        message: 'Selecione Conta.',
        order: 3,
        lesson_id: 9,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 62,
        message: 'Clique em Mudar para conta comercial.',
        order: 4,
        lesson_id: 9,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 63,
        message: 'O Instagram recomenda conectar sua conta comercial à Página  do Facebook da sua empresa',
        order: 5,
        lesson_id: 9,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 64,
        message: 'O que facilitará o uso dos recursos disponíveis para as empresas',
        order: 6,
        lesson_id: 9,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 65,
        message: 'Somente uma Página do Facebook pode ser conectada à sua conta comercial.',
        order: 7,
        lesson_id: 9,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 66,
        message: 'Inclua os detalhes, como a categoria da conta ou empresa e informações de contato.',
        order: 8,
        lesson_id: 9,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 67,
        message: 'Toque em Concluído.',
        order: 9,
        lesson_id: 9,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      //

      // LESSONS 10
      {
        id: 68,
        message: 'Abra o Instagram.',
        order: 1,
        lesson_id: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 69,
        message: ' Acesse a tela inicial.',
        order: 2,
        lesson_id: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 70,
        message: 'Clique na câmera no canto superior esquerdo.',
        order: 3,
        lesson_id: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 71,
        message: 'Agora você está com o Stories aberto.',
        order: 4,
        lesson_id: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 72,
        message: 'Clique no botão branco para tirar uma foto. Mantenha-o pressionado para criar um vídeo ou...',
        order: 5,
        lesson_id: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 73,
        message: 'Deslize o dedo para cima da tela para compartilhar foto e vídeo da sua galeria.',
        order: 6,
        lesson_id: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 74,
        message: 'Clique no canto inferior escrito “ao vivo” para compartilhar vídeo em tempo real.',
        order: 7,
        lesson_id: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 75,
        message: 'Clique no canto inferior escrito “texto” para compartilhar algo escrito.',
        order: 8,
        lesson_id: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // lesson11

      {
        id: 76,
        message: 'Abra o Instagram.',
        order: 1,
        lesson_id: 11,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 77,
        message: ' Acesse a tela inicial.',
        order: 2,
        lesson_id: 11,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 78,
        message: 'Clique na câmera no canto superior esquerdo.',
        order: 3,
        lesson_id: 11,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 79,
        message: 'Agora você está com o Stories aberto.',
        order: 4,
        lesson_id: 11,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 80,
        message: 'Tire uma foto, faça um vídeo, faça um boomerang, o que desejar.',
        order: 5,
        lesson_id: 11,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 81,
        message: 'Clique no ícone de carinha sorrindo localizado canto superior direito.',
        order: 6,
        lesson_id: 11,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 82,
        message: 'Veja os Stickers disponíveis e clique em um para escolher.',
        order: 7,
        lesson_id: 11,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 83,
        message: 'Aumente ou diminua o tamanho do Sticker se desejar.',
        order: 8,
        lesson_id: 11,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 84,
        message: 'Pronto!.',
        order: 9,
        lesson_id: 11,
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // LESSONS 12
      {
        id: 85,
        message: 'Instale um aplicativo de música (Spotify ou qualquer outro).',
        order: 1,
        lesson_id: 12,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 86,
        message: 'No Spotify ou o no app que escolheu, deixe a música tocando em segundo plano.',
        order: 2,
        lesson_id: 12,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 87,
        message: 'Enquanto isso, grave seu vídeo no Stories.',
        order: 3,
        lesson_id: 12,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 88,
        message: 'Quando quiser parar a música, é só ir no atalho do seu telefone e dar uma pausa na canção.',
        order: 4,
        lesson_id: 12,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 89,
        message: 'Seu Instagram Stories com música está pronto!.',
        order: 5,
        lesson_id: 12,
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // lesson 13

      {
        id: 90,
        message: 'Abra o Instagram.',
        order: 1,
        lesson_id: 13,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 91,
        message: 'Faça seus stories.',
        order: 2,
        lesson_id: 13,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 92,
        message: 'Clique no ícone de clips, que aparece na parte superior da tela.',
        order: 3,
        lesson_id: 13,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 93,
        message: 'Copie ou digite o endereço do site.',
        order: 4,
        lesson_id: 13,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 94,
        message: 'Toque no botão Salvar.',
        order: 5,
        lesson_id: 13,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 95,
        message: 'Pronto. O link externo foi adicionado!.',
        order: 6,
        lesson_id: 13,
        createdAt: new Date(),
        updatedAt: new Date()
      }

    ], {})
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('steps', null, {})
  }
}
