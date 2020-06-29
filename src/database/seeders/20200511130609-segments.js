'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('segments', [
      {
        id: 1,
        name: 'Alimentos',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        name: 'Arte e Antiguidades',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        name: 'Artigos Religiosos',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        name: 'Assinaturas e Revistas',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        name: 'Beleza e Estética',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 6,
        name: 'Brinquedos',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 7,
        name: 'Casa e Decoração',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 8,
        name: 'Computação',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 9,
        name: 'Confecções',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 10,
        name: 'Construção e Ferramentas',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 11,
        name: 'Cosméticos e Perfumaria',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 12,
        name: 'Couro e Calçados',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 13,
        name: 'Cursos e Educação',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 14,
        name: 'Elétrica',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 15,
        name: 'Engenharia',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 16,
        name: 'Esporte',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 17,
        name: 'Fotografia',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 18,
        name: 'Games',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 19,
        name: 'Lazer e turismo',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 20,
        name: 'Limpeza',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 21,
        name: 'Livros',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 22,
        name: 'Madeira e Móveis Planejados',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 23,
        name: 'Moda e Acessórios',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 24,
        name: 'Música',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 25,
        name: 'Papelaria e Escritório',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 26,
        name: 'Pet Shop',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 27,
        name: 'Produção audiovisual',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 28,
        name: 'Produtos digitais',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 29,
        name: 'Reciclagem',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 30,
        name: 'Saúde',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 31,
        name: 'Segurança',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 32,
        name: 'Software',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 33,
        name: 'Telemarketing',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 34,
        name: 'Transporte',
        createdAt: new Date(),
        updatedAt: new Date()
      }

    ], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('segments', null, {})
  }
}
