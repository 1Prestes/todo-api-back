import { Sequelize, Options } from 'sequelize'
require('dotenv').config()

const dbConnection: Options = {
  dialect: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  pool: {
    max: 2,
    min: 0,
    idle: 0,
    acquire: 3000,
    evict: 60,
  },
}

export const db = new Sequelize(dbConnection)
