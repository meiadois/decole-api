import swaggerJsdoc from 'swagger-jsdoc'
// const swaggerJsdoc = require('swagger-jsdoc')
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      // API informations (required)
      title: 'decole-api', // Title (required)
      version: '1.0.0', // Version (required)
      description: 'Api do aplicado Decole', // Description (optional)
      host: 'https://api.decole.app', // Host (optional)
      basePath: '/v1' // Base path (optional)
    }
  },
  apis: [
    './src/controllers/*.ts'
  ]

}

const specs = swaggerJsdoc(swaggerOptions)
export default specs
