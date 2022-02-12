const { row, rows } = require("../../../util/db")

const schoolLoginSQL = `
    select
        id,
        name,
        login
    from schools
        where
        login = $1 and password = crypt($2, password)
`
const schoolLogin = ({login, password}) => row(schoolLoginSQL, login, password)


const createClassSQL = `
    insert into classes(class, school_id) values($1, $2) returning *
`
const createClass = (class_number, school_id) => row(createClassSQL, class_number, school_id)

const selectClassesSQL = `
    select * from classes;
`
const selectClasses = () => rows(selectClassesSQL)


module.exports.schoolLogin = schoolLogin
module.exports.createClass = createClass
module.exports.selectClasses = selectClasses