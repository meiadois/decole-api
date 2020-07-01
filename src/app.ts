import Database from '@models/index'
import routes from './routes'
import { HandleErrorMiddleware, NotFoundRoute } from 'src/utils/middlewares/ErrorHandlerMiddleware'
import express from 'express'
import cors from 'cors'
import * as moment from 'moment-timezone'
import * as path from 'path'
import * as fs from 'fs'
import * as bodyParser from 'body-parser'
import swaggerOptions from './swaggerOptions'
import * as swaggerUi from 'swagger-ui-express'
import { LogsMiddleware } from '@utils/middlewares/LogsMiddleware'

moment.tz.setDefault('America/Sao_Paulo')

class App {
  public express: express.Application
  public public_folder = path.join(__dirname, 'public')

  public constructor () {
    this.express = express()

    this.createPublicFolders()
    this.middlewares()
    this.database()
    this.swagger()
    this.routes()
    this.errorHandler()
  }

  private createFolder (folder: string): void {
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder, { recursive: true })
    }
  }

  private createPublicFolders (): void {
    this.createFolder(this.public_folder)
    this.createFolder(path.join(this.public_folder, 'tmp'))
    this.express.use(express.static(path.join(__dirname, 'public')))

    // this.createFolder(path.join(this.public_folder, 'companies'))
    // this.express.use('files/companies', express.static(path.join(this.public_folder, 'companies')))

    this.createFolder(path.join(this.public_folder, 'assets'))
    this.express.use('assets', express.static(path.join(this.public_folder, 'assets')))

    this.createFolder(path.join(this.public_folder, 'companies', 'banners'))
    this.express.use('companies/banners', express.static(path.join(this.public_folder, 'companies', 'banners')))

    this.createFolder(path.join(this.public_folder, 'companies', 'thumbnails'))
    this.express.use('companies/thumbnails', express.static(path.join(this.public_folder, 'companies', 'thumbnails')))
  }

  private middlewares (): void {
    this.express.use(bodyParser.json())
    this.express.use(bodyParser.urlencoded({ extended: true }))
    this.express.use(express.json())
    this.express.use(cors())
    this.express.use(LogsMiddleware)
  }

  private swagger (): void {
    this.express.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerOptions))
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
        console.log(`Database error when sync: ${err.message}`)
      }
    }).catch((err: Error) => {
      console.log(`Database error on authenticate: ${err.message}`)
    })
  }

  private routes (): void {
    this.express.get('/', function (req, res) {
      return res.json({ message: 'Seja bem vindo(a)' })
    })

    this.express.use('/v1', routes)
    this.express.get('*', NotFoundRoute)
  }

  private errorHandler (): void {
    this.express.use(HandleErrorMiddleware)
  }
}

export default new App().express
