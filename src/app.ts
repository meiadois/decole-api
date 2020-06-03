import Database from './models/index'
import routes from './routes'
import { HandleErrorMiddleware, NotFoundRoute } from './helpers/ErrorHandler'
import * as express from 'express'
import * as cors from 'cors'
import * as moment from 'moment-timezone'
import * as path from 'path'
import * as fs from 'fs'
import * as bodyParser from 'body-parser'
import AutoDeployService from './services/AutoDeployService'
moment.tz.setDefault('America/Sao_Paulo')

class App {
  public express: express.Application
  public public_folder = path.join(__dirname, 'public')

  public constructor () {
    this.express = express()

    this.createPublicFolders()
    this.middlewares()
    this.database()
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
