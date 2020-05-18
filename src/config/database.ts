import { Options } from 'sequelize'

require('dotenv').config()

export interface DatabaseConfig {
  username: string;
  password: string;
  database: string;
}
console.log(process.env.DB_SEQUELIZE_DATABASE)
export const databaseOptions: Options = {
  dialect: 'mysql',
  host: String(process.env.DB_SEQUELIZE_HOST),
  port: Number(process.env.DB_SEQUELIZE_PORT),
  database: String(process.env.DB_SEQUELIZE_DATABASE),
  username: String(process.env.DB_SEQUELIZE_USERNAME),
  password: String(process.env.DB_SEQUELIZE_PASSWORD),
  logging: true,
  timezone: '-03:00'
}
export const databaseConfig: DatabaseConfig = {
  database: String(process.env.DB_SEQUELIZE_DATABASE),
  username: String(process.env.DB_SEQUELIZE_USERNAME),
  password: String(process.env.DB_SEQUELIZE_PASSWORD)
}
