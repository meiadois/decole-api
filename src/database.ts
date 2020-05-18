import { Sequelize } from 'sequelize-typescript'
import * as path from 'path'

export const sequelize = new Sequelize({
  dialect: 'mysql',
  host: process.env.DB_SEQUELIZE_HOST,
  database: process.env.DB_SEQUELIZE_DATABASE,
  username: process.env.DB_SEQUELIZE_USERNAME,
  password: process.env.DB_SEQUELIZE_PASSWORD,
  storage: ':memory:',
  models: [path.join(__dirname, 'models')]
})

/*
export const sequelize = new Sequelize(
  'sql10341480', 'sql10341480',
  'pvH1X3wtku', {
    dialect: 'mysql',
    host: process.env.DB_SEQUELIZE_HOST
  })
*/
