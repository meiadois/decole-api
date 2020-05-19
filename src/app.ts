import Database from './models/index'
import routes from './routes'
import * as cors from 'cors'
import * as express from 'express'
import * as moment from 'moment-timezone'
moment.tz.setDefault('America/Sao_Paulo')

class App {
  public express: express.Application

  public constructor () {
    this.express = express()

    this.middlewares()
    this.database()
    this.routes()
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
  }
}

export default new App().express
