const { row } = require("../../../util/db")

const adminLoginSQL = `
    select
        id,
        name,
        login
    from schools
        where
        login = $1 and password = crypt($2, password)
`

const adminLogin = ({login, password}) => {
    return row(adminLoginSQL, login, password)
}


module.exports.adminLogin = adminLogin