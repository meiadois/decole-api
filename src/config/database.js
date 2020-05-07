require('dotenv/config');
module.exports = {
  dialect: process.env.DB_SEQUELIZE_DIALECT,
  host: process.env.DB_SEQUELIZE_HOST,
  username: process.env.DB_SEQUELIZE_USERNAME,
  password: process.env.DB_SEQUELIZE_PASSWORD,
  database: process.env.DB_SEQUELIZE_DATABASE,
  port: process.env.DB_SEQUELIZE_PORT,
  dialectOptions: {
    ssl: 'Amazon RDS'
  },
  pool: {
    maxConnections: 5, maxIdleTime: 30,
  },
  define: {
    timestamps: true,
  },
};