import { Sequelize } from 'sequelize'
import * as path from 'path'
// import { databaseConfig, databaseOptions } from './config/database'
require('dotenv').config()
// console.log(databaseOptions)
// import dbConfig from './config/database'
const dbConfig = require('./config/database.js')
export const database = new Sequelize(dbConfig)
