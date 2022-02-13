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
const schoolLogin = ({ login, password }) => row(schoolLoginSQL, login, password)


const createClassSQL = `
    insert into classes(class, school_id) values($1, $2) returning *
`
const createClass = (class_number, school_id) => row(createClassSQL, class_number, school_id)

const selectClassesSQL = `
    select * from classes
    order by
        id;
`
const selectClasses = () => rows(selectClassesSQL)

const deleteClassSQL = `
    delete from classes
        where id = $1
    returning *
`
const deleteClass = (class_id) => row(deleteClassSQL, class_id)

const updeteClassSQL = `
    update classes set
        class = coalesce($2, class),
        school_id = coalesce($3, school_id)
    where
    id = $1
    returning *
`
const updeteClass = (class_id, class_number, school_id) => row(updeteClassSQL, class_id, class_number, school_id)


module.exports.schoolLogin = schoolLogin
module.exports.createClass = createClass
module.exports.selectClasses = selectClasses
module.exports.deleteClass = deleteClass
module.exports.updeteClass = updeteClass