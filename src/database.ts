import { Sequelize } from 'sequelize-typescript'
import * as path from 'path'

export const sequelize = new Sequelize('DecoleDB', 'admin', 'SENHA', {
  host: '',
  dialect: 'mysql',
  models: [path.join(__dirname, 'models')]
})
