'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('steps', [
      {
        id: 18,
        message: 'Acesse instagram.com.',
        order: 1,
        lesson_id: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 19,
        message: 'Informe seu endereço de email.',
        order: 2,
        lesson_id: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 20,
        message: 'Crie um nome de usuário e uma senha.',
        order: 3,
        lesson_id: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 21,
        message: 'Ou clique em Entrar com o Facebook para se cadastrar com a conta do Facebook.',
        order: 4,
        lesson_id: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 22,
        message: 'Caso queira se inscrever com um email, clique em Cadastre-se.',
        order: 5,
        lesson_id: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 23,
        message: ' Se você se cadastrar com o email ou número de telefone, crie um nome de usuário e uma senha, preencha as informações do perfil e toque em Concluir.',
        order: 6,
        lesson_id: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 24,
        message: 'Se você se cadastrar com o Facebook, será necessário entrar na conta do Facebook, caso tenha saído dela.',
        order: 7,
        lesson_id: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {})
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('steps', null, {})
  }
}
