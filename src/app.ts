
import StepsController from './controllers/StepsController'
import cors = require('cors')
import express = require('express')
require('dotenv').config()
class App {
    public express: express.Application

    public constructor () {
      this.express = express()
      this.middlewares()
      this.routes()
    }

    public middlewares (): void {
      this.express.use(express.json())
      this.express.use(cors())
    }

    private routes (): void {
      this.express.get('/', StepsController.list)
    }
}

export default new App().express
