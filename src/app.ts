import Database from './models/index'
import routes from './routes'
import { HandleErrorMiddleware, NotFoundRoute } from './helpers/ErrorHandler'
import * as express from 'express'
import * as cors from 'cors'
import * as moment from 'moment-timezone'
import AutoDeployService from './services/AutoDeployService'
moment.tz.setDefault('America/Sao_Paulo')

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
    this.express.post('/deploy', AutoDeployService.deploy)
    this.express.get('/', function (req, res) {
      return res.json({ message: 'V1' })
    })

    this.express.use('/v1', routes)
    this.express.get('*', NotFoundRoute)
  }

  private errorHandler (): void {
    this.express.use(HandleErrorMiddleware)
  }
}

export default new App().express
