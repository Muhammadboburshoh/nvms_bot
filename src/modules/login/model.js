const { row } = require("../../../util/db")

//school login
const schoolLoginSQL = `
    select
        school_id,
        name,
        login
    from schools
        where
        login = $1 and password = crypt($2, password)
`
const schoolLogin = ({login, password}) => row(schoolLoginSQL, login, password)


//main admin login
const adminLoginSQL = `
    select
        admin_id,
        role,
        login
    from admins
        where
        login = $1 and password = crypt($2, password)
`
const adminLogin = ({ login, password }) => row(adminLoginSQL, login, password)


module.exports.schoolLogin = schoolLogin
module.exports.adminLogin = adminLogin