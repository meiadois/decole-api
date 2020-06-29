'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('steps', [

      // lesson 14

      {
        id: 96,
        message: 'Escolha uma frase curta e simples, pois assim é mais fácil de memorizar.',
        order: 1,
        lesson_id: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 97,
        message: 'A hashtag é precedida pelo símbolo # e é formada por palavra, frase ou sigla sem espaçamento.',
        order: 2,
        lesson_id: 14,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 98,
        message: 'Use um separador entre a legenda e a hashtag, isso dá uma aparência mais organizada à publicação.',
        order: 3,
        lesson_id: 14,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 99,
        message: 'Quantidade de hashtags deve ser menor que a quantidade de texto presente na postagem.',
        order: 4,
        lesson_id: 14,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 100,
        message: 'Por mais que o app permita a inclusão de até 30# nem sempre é interessante ultrapassar o número de 10. Por isso priorize as mais específicas ao conteúdo da publicação.',
        order: 5,
        lesson_id: 14,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 101,
        message: 'Categorize: assim, quanto mais específica, maior a eficiência da sua hashtag, gerando menor concorrência.',
        order: 6,
        lesson_id: 14,
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // lesson 15

      {
        id: 102,
        message: 'Antes de planejar o conteúdo, você precisa saber o que esperar das Redes Sociais para seu negocio!.',
        order: 1,
        lesson_id: 15,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 103,
        message: 'Possíveis objetivos: Ganhar ou aumentar o reconhecimento da marca, Gerar novos leads(possível clientes), Melhorar a comunicação com seus clientes.',
        order: 2,
        lesson_id: 15,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 104,
        message: 'Depois de definir seus objetivo planeje o conteúdo.',
        order: 3,
        lesson_id: 15,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 105,
        message: 'Tente manter um frequência três posts por semana.',
        order: 4,
        lesson_id: 15,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 106,
        message: 'Faça um calendário e planeje com antecedência suas postagem, dica: utilize o trello.',
        order: 5,
        lesson_id: 15,
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // lesson 16

      {
        id: 107,
        message: 'Imagem de perfil o tamanho mínimo: 110×100 pixels, tamanho recomendado: 152×152 pixels',
        order: 1,
        lesson_id: 16,
        createdAt: new Date(),
        updatedAt: new Date()
      },

      {
        id: 108,
        message: 'O Instagram recomenda um mínimo de 152 x 152 pixels para as imagens terem melhor qualidade tanto no aplicativo móvel quanto em computadores.',
        order: 2,
        lesson_id: 16,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 109,
        message: 'Imagem da linha do tempo o tamanho para fotos quadradas mínimo : 600×600 , recomendado: 1080×1080 , Tamanho para fotos retangulares: máximo de 1920 pixels de altura.',
        order: 3,
        lesson_id: 16,
        createdAt: new Date(),
        updatedAt: new Date()
      },

      {
        id: 110,
        message: 'Instagram Stories tamanho recomendado: 1080×1920O, os vídeos podem ter no máximo 15 segundos. Já fotos são exibidas por 5 segundos.',
        order: 4,
        lesson_id: 16,
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // lesson 17

      {
        id: 111,
        message: 'Entretenimento : Concursos, Sorteios.',
        order: 1,
        lesson_id: 17,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 112,
        message: 'Inspiração : Frases motivacionais, Curiosidades, Historias.',
        order: 2,
        lesson_id: 17,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 113,
        message: 'Educação : Dicas, Tuques, Tutorial.',
        order: 3,
        lesson_id: 17,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 114,
        message: 'Diálogo : Perguntas, Enquetes.',
        order: 4,
        lesson_id: 17,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 115,
        message: 'Promoção : Descontos, Serviços, Produtos.',
        order: 5,
        lesson_id: 17,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 116,
        message: 'Bastidores : Preview de novos produtos, Funcionarios, Eventos.',
        order: 6,
        lesson_id: 17,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 117,
        message: 'Datas Comemorativas.',
        order: 7,
        lesson_id: 17,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 118,
        message: 'Assuntos do momento.',
        order: 8,
        lesson_id: 17,
        createdAt: new Date(),
        updatedAt: new Date()
      }

    ], {})
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('steps', null, {})
  }
}
