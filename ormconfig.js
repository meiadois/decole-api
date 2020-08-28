require('dotenv/config')
const path = require('path')
function verifyIfIsProduction () {
  return process.env.PRODUCTION === 'TRUE'
}

const isProduction = verifyIfIsProduction()

const appRoot = isProduction ? 'dist' : 'src'
const extPattern = isProduction ? '*.js' : '*.ts'

const entitiesPath = path.join(appRoot, 'database', 'entity')
const migrationsPath = path.join(appRoot, 'database', 'migration')
const subscriberPath = path.join(appRoot, 'database', 'subscriber')
if(isProduction){
  console.log('Configurações TypeORM:')
  console.log(`-- Entities: ${path.join(entitiesPath, extPattern)}`)
  console.log(`-- Migrations: ${path.join(migrationsPath, extPattern)}`)
  console.log(`-- Subscriber: ${path.join(subscriberPath, extPattern)}`)
}


module.exports = {
  host: process.env.DATABASE_HOST,
  type: 'mysql',
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: false,
  logging: false,
  entities: [
    path.join(entitiesPath, extPattern)
  ],
  migrations: [
    path.join(migrationsPath, extPattern)

  ],
  subscribers: [
    path.join(subscriberPath, extPattern)
  ],
  cli: {
    entitiesDir: entitiesPath,
    migrationsDir: migrationsPath,
    subscribersDir: subscriberPath
  }
}
