'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('steps', [
      {
        id: 1,
        message: 'Ao contrário de outras redes sociais, o Instagram é muito mais focado no visual. A interface é simples, e basta abrir o aplicativo para começar a ver fotos e vídeos das pessoas e empresas que você segue.',
        order: 1,
        lesson_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        message: 'No Brasil, são mais de 50 milhões de usuários, sendo o segundo país em número de contas ativas na rede.',
        order: 2,
        lesson_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        message: 'Permite a criação de campanhas publicitárias com diferentes objetivos.',
        order: 3,
        lesson_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        message: 'O uso das hashtags - # - torna a sua publicação mais acessível para aqueles que compartilham de interesses em comum.',
        order: 4,
        lesson_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        message: 'O seu acesso não se restringe a ambientes fechados, sendo utilizados pelos usuários em diferentes horários e até mesmo durante deslocamentos.',
        order: 5,
        lesson_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 6,
        message: 'O conteúdo é apresentado ao usuário tendo como base seus interesses, o que garante às empresas maior eficiência no engajamento.',
        order: 6,
        lesson_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 7,
        message: 'É integrado a outras redes sociais, entre elas o Facebook, Twitter, Foursquare, Tumbler e Flickr.',
        order: 7,
        lesson_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 8,
        message: 'O perfil corporativo permite acesso às métricas e dados estatísticos como: impressões, alcance, cliques, entre outros.',
        order: 8,
        lesson_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 9,
        message: 'Oferece dados específicos sobre os seus seguidores como localização, gênero e idade, possibilitando maior direcionamento de ações e campanhas que atendam as expectativas do seu público.',
        order: 9,
        lesson_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 10,
        message: 'Apesar de exigir certo nível de qualificação do profissional que produz e gerencia o conteúdo, possui baixo custo para as publicações.',
        order: 10,
        lesson_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 11,
        message: 'É um novo canal de comunicação com o público, facilitando o contato direto do cliente com a empresa que conta com esse tipo de perfil.',
        order: 11,
        lesson_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }

    ], {})
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('steps', null, {})
  }
}
