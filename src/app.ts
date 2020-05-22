import Database from './models/index'
import routes from './routes'
import { HandleErrorMiddleware, NotFoundRoute } from './helpers/ErrorHandler'
import express = require('express')
import cors = require('cors')
import moment = require('moment-timezone')
moment.tz.setDefault('America/Sao_Paulo')

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Decole API',
      description: 'API escrita em Typescript.',
      contact: {
        name: 'Decole Dev'
      },
      servers: ['http://localhost:3000/']
    }
  },
  apis: ['src/**/*.ts']
}

class App {
  public express: express.Application

  public constructor () {
    this.express = express()

    this.middlewares()
    this.database()
    this.routes()
    this.errorHandler()
  }

  private middlewares (): void {
    this.express.use(express.json())
    this.express.use(cors())
  }

  private database (): void {
    const db = Database.getInstance()
    db.initModels()
    db.associateModels()
    db.sequelize.authenticate().then(async () => {
      console.log('Database connected')

      try {
        await db.sequelize.sync({ force: false })
        console.log('Database is up to date')
      } catch (err) {
        console.log(err.message)
      }
    }).catch((err: Error) => {
      console.log(err.message)
    })
  }

  private routes (): void {
    this.express.use('/v1', routes)
    this.express.get('*', NotFoundRoute)
  }

  private errorHandler (): void {
    this.express.use(HandleErrorMiddleware)
  }
}

export default new App().express
