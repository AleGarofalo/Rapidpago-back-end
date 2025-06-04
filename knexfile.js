require('dotenv').config(); // Carga las variables de entorno desde .env

module.exports = {
    development: {
        client: 'mysql',
        connection: {
            host: process.env.PORTAL_DB_HOST,
            port: process.env.PORTAL_DB_PORT,
            user: process.env.PORTAL_DB_USER,
            password: process.env.PORTAL_DB_PASSWORD,
            database: process.env.PORTAL_DB_DATABASE
        },
        migrations: {
            directory: './database/migrations'
        },
        seeds: {
            directory: './database/seeds'
        }
    }
};