'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('steps', [
      {
        id: 56,
        message: 'Instale um aplicativo de música (Spotify ou qualquer outro).',
        order: 1,
        lesson_id: 8,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 57,
        message: 'No Spotify ou o no app que escolheu, deixe a música tocando em segundo plano.',
        order: 2,
        lesson_id: 8,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 58,
        message: 'Enquanto isso, grave seu vídeo no Stories.',
        order: 3,
        lesson_id: 8,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 59,
        message: 'Quando quiser parar a música, é só ir no atalho do seu telefone e dar uma pausa na canção.',
        order: 4,
        lesson_id: 8,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 60,
        message: 'Seu Instagram Stories com música está pronto!.',
        order: 5,
        lesson_id: 8,
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // lesson 9

      {
        id: 61,
        message: 'Abra o Instagram.',
        order: 1,
        lesson_id: 9,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 62,
        message: 'Faça seus stories.',
        order: 2,
        lesson_id: 9,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 63,
        message: 'Clique no ícone de clips, que aparece na parte superior da tela.',
        order: 3,
        lesson_id: 9,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 64,
        message: 'Copie ou digite o endereço do site.',
        order: 4,
        lesson_id: 9,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 65,
        message: 'Toque no botão Salvar.',
        order: 5,
        lesson_id: 9,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 66,
        message: 'Pronto. O link externo foi adicionado!.',
        order: 6,
        lesson_id: 9,
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // lesson 10

      {
        id: 67,
        message: 'Escolha uma frase curta e simples, pois assim é mais fácil de memorizar.',
        order: 1,
        lesson_id: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 68,
        message: 'A hashtag é precedida pelo símbolo # e é formada por palavra, frase ou sigla sem espaçamento.',
        order: 2,
        lesson_id: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 69,
        message: 'Use um separador entre a legenda e a hashtag, isso dá uma aparência mais organizada à publicação.',
        order: 3,
        lesson_id: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 70,
        message: 'Quantidade de hashtags deve ser menor que a quantidade de texto presente na postagem.',
        order: 4,
        lesson_id: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 71,
        message: 'Por mais que o app permita a inclusão de até 30# nem sempre é interessante ultrapassar o número de 10. Por isso priorize as mais específicas ao conteúdo da publicação.',
        order: 5,
        lesson_id: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 72,
        message: 'Categorize: assim, quanto mais específica, maior a eficiência da sua hashtag, gerando menor concorrência.',
        order: 6,
        lesson_id: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // lesson 11

      {
        id: 73,
        message: 'Antes de planejar o conteúdo, você precisa saber o que esperar das Redes Sociais para seu negocio!.',
        order: 1,
        lesson_id: 11,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 74,
        message: 'Possiveis objetivos: Ganhar ou aumentar o reconhecimento da marca, Gerar novos leads(possivel clientes), Melhorar a comunicação com seus clientes.',
        order: 2,
        lesson_id: 11,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 75,
        message: 'Depois de definir seus objetivo planeje o conteudo.',
        order: 3,
        lesson_id: 11,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 76,
        message: 'Tente manter um frequencia três posts por semana.',
        order: 4,
        lesson_id: 11,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 77,
        message: 'Faça um calendário e planeje com antencedência suas postagem, dica: utilize o trello.',
        order: 5,
        lesson_id: 11,
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // lesson 12

      {
        id: 78,
        message: 'Imagem de perfil.',
        order: 1,
        lesson_id: 12,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 79,
        message: 'Tamanho mínimo: 110×100 pixels, Tamanho recomendado: 152×152 pixels.',
        order: 2,
        lesson_id: 12,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 80,
        message: 'O Instagram recomenda um mínimo de 152 x 152 pixels para as imagens terem melhor qualidade tanto no aplicativo móvel quanto em computadores.',
        order: 3,
        lesson_id: 12,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 81,
        message: 'Imagem da linha do tempo.',
        order: 4,
        lesson_id: 12,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 82,
        message: 'Tamanho para fotos quadradas mínimo : 600×600 , recomendado: 1080×1080 , Tamanho para fotos retangulares: máximo de 1920 pixels de altura.',
        order: 5,
        lesson_id: 12,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 83,
        message: 'Instagram Stories.',
        order: 6,
        lesson_id: 12,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 84,
        message: 'Tamanho recomendado: 1080×1920.',
        order: 7,
        lesson_id: 12,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 85,
        message: 'Os vídeos podem ter no máximo 15 segundos. Já fotos são exibidas por 5 segundos.',
        order: 8,
        lesson_id: 12,
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // lesson 13

      {
        id: 86,
        message: 'Entretenimento : Memes, Concursos, Sorteios.',
        order: 1,
        lesson_id: 13,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 87,
        message: 'Inspiração : Frases motivacionais, Curiosidades, Historias.',
        order: 2,
        lesson_id: 13,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 88,
        message: 'Educação : Dicas, Tuques, Tutorial.',
        order: 3,
        lesson_id: 13,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 89,
        message: 'Diálogo : Perguntas, Enquetes.',
        order: 4,
        lesson_id: 13,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 90,
        message: 'Promoção : Descontos, Serviços, Produtos.',
        order: 5,
        lesson_id: 13,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 91,
        message: 'Bastidores : Preview de novos produtos, Funcionarios, Eventos.',
        order: 6,
        lesson_id: 13,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 92,
        message: 'Datas Comemorativas.',
        order: 7,
        lesson_id: 13,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 93,
        message: 'Assuntos do momento.',
        order: 8,
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
