const { row } = require("../../../util/db")

const schoolLoginSQL = `
    select
        id,
        name,
        login
    from schools
        where
        login = $1 and password = crypt($2, password)
`
const schoolLogin = ({login, password}) => {
    return row(schoolLoginSQL, login, password)
}

/*
const adminLoginSQL = `
    select
        id,
        role,
        login,
        school
    from admins
        where
        login = $1 and password = crypt($2, password)
`
const adminLogin = ({login, password}) => {
    return row(adminLoginSQL, login, password)
}

module.exports.adminLogin = adminLogin
*/

module.exports.schoolLogin = schoolLogin