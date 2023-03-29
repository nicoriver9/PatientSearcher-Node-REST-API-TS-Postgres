import { Dialect, Sequelize } from 'sequelize'
import dotenv from 'dotenv';

dotenv.config();


const dbName        = process.env.PG_DB_NAME as string
const dbUser        = process.env.PG_DB_USER as string
const dbHost        = process.env.PG_DB_HOST
const dbDriver      = process.env.PG_DB_DIALECT as Dialect
const dbPassword    = process.env.PG_DB_PASSWORD

const sequelize = new Sequelize(
    dbName, 
    dbUser, 
    dbPassword, 
    {
    host: dbHost,
    dialect: dbDriver
    }
)

export default sequelize

