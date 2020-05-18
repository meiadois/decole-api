import { initStep, associateStep } from './Step'
import { initSegment, associateSegment } from './Segment'
const dbConfig = require('../config/database.js')
const Sequelize = require('sequelize')

interface DB {
  [key: string]: any;
}

const sequelize = new Sequelize(dbConfig)

initStep(sequelize)
associateStep()

initSegment(sequelize)
associateSegment()

const db = {
  sequelize,
  Sequelize,
  Step: sequelize.models.Step,
  Segment: sequelize.models.Segment

}

export default db
