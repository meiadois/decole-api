'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('steps', [
      // rota1
      //lesson 1
      {
        id: 1,
        message: "Abra o App.",
        order: 1,
        lesson_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        message: "Clique em criar conta.",
        order: 2,
        lesson_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        message: "Preencha os dados do formulário.",
        order: 3,
        lesson_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      //lesson 2
      {
        id: 4,
        message: "Clique no seu perfil.",
        order: 1,
        lesson_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 5,
        message: "Clique em editar perfil.",
        order: 2,
        lesson_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 6,
        message: "Clique em bio.",
        order: 3,
        lesson_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 7,
        message: "Em 150 caracteres, a BIO é o espaço onde sua empresa terá para descrever de" +
          " forma breve o que é ou do que se trata o perfil. Com múltiplas funções, a BIO pode" +
          " alcançar, engajar, ganhar ou fidelizar clientes. Para potencializar o alcance da sua" +
          " BIO e explorar seu potencial, separamos duas dicas para te ajudar com a sua" +
          " criação e estruturação.",
        order: 4,
        lesson_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 8,
        message: "Exponha claramente o objetivo do perfil," +
          "Do que ele trata? É uma empresa de serviços? Uma loja? Qual a sua" +
          " razão de ser? Deixar isso claro não apenas é o primeiro filtro, mas" +
          " também prepara o seguidor, ou visitante ao conteúdo o deixando" +
          " mais confortável e interessados nas publicações.",
        order: 5,
        lesson_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        id: 9,
        message: "Deixe clara a personalidade da empresa," +
          " Os seus seguidores serão aqueles que se identificam com os valores" +
          " da sua empresa.",
        order: 6,
        lesson_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      //lesson 3
      {
        id: 10,
        message: "Clique no seu perfil.",
        order: 1,
        lesson_id: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 11,
        message: "Clique em editar perfil.",
        order: 2,
        lesson_id: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 12,
        message: "Clique em alterar foto do perfil.",
        order: 3,
        lesson_id: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // rotas 2
      //lesson 4
      {
        id: 13,
        message: "Logue no seu facebook pessoal se não tiver crie.",
        order: 1,
        lesson_id: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 14,
        message: "Clique no menu.",
        order: 2,
        lesson_id: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 15,
        message: "Clique em página.",
        order: 3,
        lesson_id: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 16,
        message: "Clique em criar página.",
        order: 4,
        lesson_id: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 17,
        message: "Escolha as categorias para descreve seu negócio.",
        order: 6,
        lesson_id: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 18,
        message: "Digite o nome de seu negócio.",
        order: 7,
        lesson_id: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 19,
        message: "Digite o nome do seu site se não tem marque a opção.",
        order: 8,
        lesson_id: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      //lesson 5
      {
        id: 20,
        message: "Clique no menu.",
        order: 1,
        lesson_id: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 21,
        message: "Clique em página.",
        order: 2,
        lesson_id: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 22,
        message: "Escolha sua página.",
        order: 3,
        lesson_id: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 23,
        message: "Clique na foto do perfil de sua página.",
        order: 4,
        lesson_id: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 24,
        message: "Escolha uma foto.",
        order: 5,
        lesson_id: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      //lesson 6
      {
        id: 25,
        message: "Clique no menu.",
        order: 1,
        lesson_id: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 26,
        message: "Clique em página.",
        order: 2,
        lesson_id: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 27,
        message: "Escolha sua página.",
        order: 3,
        lesson_id: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 28,
        message: "Clique na área da capa de sua página.",
        order: 4,
        lesson_id: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 29,
        message: "Escolha uma foto para a capa.",
        order: 5,
        lesson_id: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      //lesson 7
      {
        id: 30,
        message: "Acesse seu perfil e clique no ícone de Configurações.",
        order: 1,
        lesson_id: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 31,
        message: "Selecione Conta.",
        order: 2,
        lesson_id: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 32,
        message: "Clique em Mudar para conta comercial.",
        order: 3,
        lesson_id: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 33,
        message: "O instagram recomenda conectar sua conta comercial à Página" +
          " do Facebook da sua empresa, o que facilitará o uso dos recursos" +
          " disponíveis para as empresas. No momento, somente uma Página" +
          " do Facebook pode ser conectada à sua conta comercial.",
        order: 4,
        lesson_id: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 34,
        message: "Inclua os detalhes, como a categoria da conta ou empresa e" +
          " informações de contato. ",
        order: 5,
        lesson_id: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 35,
        message: "Toque em Concluído.",
        order: 6,
        lesson_id: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
      },



    ], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('steps', null, {});
  }
};
