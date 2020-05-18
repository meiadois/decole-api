
'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('companies', [
      {
        id: 1,
        name: 'Alim',
        cep: '41600-590',
        description: 'Uma empresa que vende alimentos.',
        thumbnail: 'google.com.br',
        cnpj: '35.498.157/0001-73',
        segment_id: 1,
        cellphone: "7111112222",
        email: "ohomi@gmail.com",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        name: 'Mysoft',
        cep: '23214-025',
        description: 'Uma fábrica de software.',
        thumbnail: 'google.com.br',
        cnpj: '31.500.190/1250-73',
        cellphone: "7122224444",
        email: "senai2010@gmail.com",
        segment_id: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        name: 'EducaMundo',
        cep: '41632-540',
        description: 'Uma escola.',
        thumbnail: 'google.com.br',
        cnpj: '32.343.656/0058-79',
        cellphone: "71333344444",
        email: "nairanatestanoix@gmail.com",
        segment_id: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        name: 'TestWorld',
        cep: '46231-765',
        description: 'Uma Empresa de teste de software.',
        thumbnail: 'google.com.br',
        cnpj: '20.000.784/0000-70',
        cellphone: "7144445555",
        email: "umemailbom@gmail.com",
        segment_id: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 5,
        name: 'Clenpink',
        cep: '54321-000',
        description: 'Uma Empresa de limpeza.',
        thumbnail: 'google.com.br',
        cnpj: '12.321.456/0060-00',
        cellphone: "7155556666",
        email: "umemail@gmail.com",
        segment_id: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('companies', null, {});
  }
};
