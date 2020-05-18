import { database } from './database'
import routes from './routes'
import * as cors from 'cors'
import * as express from 'express'

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
    database.authenticate().then(async () => {
      console.log('Database connected')

      try {
        await database.sync({ force: false })
        console.log('Database is up to date')
      } catch (err) {
        console.log(err.message)
      }
    }).catch((err: Error) => {
      console.log(err.message)
    })
  }

  private routes (): void {
    this.express.use(routes)
  }
}

export default new App().express
