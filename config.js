require("dotenv").config()

const { env } = process

module.exports = {
    port: env.PORT,
    host: env.HOST,
    database: env.DATABASE,
    user: env.USER,
    password: env.PASSWORD
}
