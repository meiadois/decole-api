'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('steps', [
      {
        id: 12,
        message: 'Baixe o aplicativo do Instagram da App Store (iOS) ou da Google Play Store (Android).',
        order: 1,
        lesson_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 13,
        message: 'Depois de instalar o aplicativo, toque em abrir para abri-lo.',
        order: 2,
        lesson_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 14,
        message: 'Toque em Cadastrar-se com email ou número de telefone.',
        order: 3,
        lesson_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 15,
        message: 'Insira seu endereço de email ou número de telefone (que exigirá um código de confirmação).',
        order: 4,
        lesson_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 16,
        message: 'Toque em Avançar.',
        order: 5,
        lesson_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 17,
        message: 'Se você se cadastrar com o email ou número de telefone, crie um nome de usuário e uma senha, preencha as informações do perfil e toque em Concluir.',
        order: 6,
        lesson_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }

    ], {})
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('steps', null, {})
  }
}
