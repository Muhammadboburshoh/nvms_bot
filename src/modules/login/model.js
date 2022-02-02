const { row } = require("../../../util/db")

const adminLoginSQL = `
    select
        id,
        role,
        username
    from admins
        where
        username = $1 and password = crypt($2, password)
`

const adminLogin = ({username, password}) => {
    return row(adminLoginSQL, username, password)
}

module.exports.adminLogin = adminLogin