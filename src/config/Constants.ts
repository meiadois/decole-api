require('dotenv').config();
// App
export const APP_PORT = Number(process.env.APP_PORT) 
export const APP_HOST = Number(process.env.APP_HOST)

// Authentication
export const JWT_SALT = String(process.env.JWT_SALT)
export const JWT_EXPIRATION_IN_HOURS = String(process.env.JWT_EXP)

export const JWT_REFRESH_SALT = String(process.env.JWT_SALT)
export const JWT_REFRESH_EXPIRATION_IN_HOURS = String(process.env.JWT_EXP)

export const JWT_ACCESS_TOKEN_COOKIE_NAME = 'acess_token'
export const JWT_REFRESH_TOKEN_COOKIE_NAME = 'refresh_token'


// Database
export const DATABASE_HOST = String(process.env.DATABASE_HOST)
export const DATABASE_NAME = String(process.env.DATABASE_NAME)
export const DATABASE_USERNAME = String(process.env.DATABASE_USERNAME)
export const DATABASE_PASSWORD = String(process.env.DATABASE_PASSWORD)
export const DATABASE_PORT = Number(process.env.DATABASE_PORT)

// Redis
export const REDIS_HOST = String(process.env.REDIS_HOST)
export const REDIS_PORT = Number(process.env.REDIS_PORT)
