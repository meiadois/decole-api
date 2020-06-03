import * as fs from 'fs'
import * as path from 'path'
import { Sequelize } from 'sequelize'

export default class Database {
    private static instance: Database
    public sequelize: Sequelize
    private constructor () {
      // this.sequelize = new Sequelize(databaseConfig)
      this.sequelize = new Sequelize(
        String(process.env.DB_SEQUELIZE_DATABASE),
        String(process.env.DB_SEQUELIZE_USERNAME),
        String(process.env.DB_SEQUELIZE_PASSWORD), {
          logging: false,
          dialect: 'mysql',
          host: process.env.DB_SEQUELIZE_HOST,
          port: Number(process.env.DB_SEQUELIZE_PORT),
          ssl: false,
          timezone: '-03:00',
          define: {
            timestamps: true
          }
        }

      )
    }

    public static getInstance (): Database {
      if (!Database.instance) {
        Database.instance = new Database()
      }

      return Database.instance
    }

    public initModels (): void {
      fs
        .readdirSync(__dirname)
        .filter(file => (file.indexOf('.') !== 0) && (file !== path.basename(__filename)) && (file.slice(-3) === '.ts'))
        .forEach(async (file) => {
          const path_ = path.join(__dirname, file)
          // const model_name = file.replace(/\.[^/.]+$/, '')
          // const model = sequelize.import(path_)
          await import(path_).then((model) => {
            model.init(this.sequelize)
            // console.log(model[model_name].name)
            // db[model_name] = model[model_name]
            // Object.assign(db, { model_name: model[model_name] })
            // console.log('processado.')
            // console.log(db[model_name])
          })
        })
    }

    public associateModels (): void {
      fs
        .readdirSync(__dirname)
        .filter(file => (file.indexOf('.') !== 0) && (file !== path.basename(__filename)) && (file.slice(-3) === '.ts'))
        .forEach(async (file) => {
          const path_ = path.join(__dirname, file)
          // const model_name = file.replace(/\.[^/.]+$/, '')
          // const model = sequelize.import(path_)
          await import(path_).then((model) => {
            model.associate(this.sequelize)
            // console.log(model[model_name].name)
            // db[model_name] = model[model_name]
            // Object.assign(db, { model_name: model[model_name] })
            // console.log('processado.')
            // console.log(db[model_name])
          })
        })
    }
}
