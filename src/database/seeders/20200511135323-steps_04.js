'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('steps', [

      // bio

      {
        id: 24,
        message: 'Acesse seu perfil.',
        order: 1,
        lesson_id: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 25,
        message: 'Clique em editar perfil',
        order: 2,
        lesson_id: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 26,
        message: 'BIO é o espaço onde sua empresa terá para descrever de forma breve o que é ou do que se trata o perfil. Esse espaço possui apenas 150 caracteres.',
        order: 3,
        lesson_id: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 27,
        message: 'Com múltiplas funções, a BIO pode alcançar, engajar, ganhar ou fidelizar clientes. Para potencializar o alcance da sua BIO e explorar seu potencial.',
        order: 4,
        lesson_id: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 28,
        message: 'Separamos duas dicas para te ajudar com a sua criação e estruturação.',
        order: 5,
        lesson_id: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 29,
        message: 'Exponha claramente o objetivo do perfil, do que ele trata? É uma empresa de serviços? Uma loja? Qual a sua razão de ser? Deixar isso claro não apenas é o primeiro filtro, mas também prepara o seguidor, ou visitante ao conteúdo o deixando mais confortável e interessados nas publicações.',
        order: 6,
        lesson_id: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 30,
        message: 'Deixe clara a personalidade da empresa, os seus seguidores serão aqueles que se identificam com os valores da sua empresa.',
        order: 7,
        lesson_id: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 31,
        message: 'Onde a empresa está? Inclua endereço ou localização.',
        order: 8,
        lesson_id: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 32,
        message: 'Direcione através de um link clicável.',
        order: 9,
        lesson_id: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 33,
        message: 'Mobilize através de uma frase convite exemplo: Visite nossa página!.',
        order: 10,
        lesson_id: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      //

    ], {})
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('steps', null, {})
  }
}
