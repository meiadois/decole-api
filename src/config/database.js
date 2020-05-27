require('dotenv/config')

console.log(`HOST: ${process.env.DB_SEQUELIZE_HOST}`)
module.exports = {
  logging: console.log,
  dialect: process.env.DB_SEQUELIZE_DIALECT,
  host: process.env.DB_SEQUELIZE_HOST,
  username: process.env.DB_SEQUELIZE_USERNAME,
  password: process.env.DB_SEQUELIZE_PASSWORD,
  database: process.env.DB_SEQUELIZE_DATABASE,
  port: process.env.DB_SEQUELIZE_PORT,
  ssl: false,
  pool: {
    maxConnections: 5, maxIdleTime: 30
  },
  timezone: '-03:00',
  define: {
    timestamps: true
  }
}
