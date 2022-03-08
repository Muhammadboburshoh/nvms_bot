require("dotenv").config()

const { env } = process

module.exports = {
    port: env.DATABASE_PORT,
    host: env.HOST,
    database: env.DATABASE,
    user: env.USER,
    password: env.PASSWORD,
    site_host: env.SITE_HOST,
    token: env.TOKEN,
    options: {
        polling: true
    }
}