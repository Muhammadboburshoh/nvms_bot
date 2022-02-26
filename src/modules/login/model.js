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
const schoolLogin = ({login, password}) => {
    return row(schoolLoginSQL, login, password)
}


module.exports.schoolLogin = schoolLogin