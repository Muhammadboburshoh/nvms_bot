const { row, rows } = require("../../../util/db")

// class created
const createClassSQL = `
    insert into classes(class, school_id) values($1, $2) returning *
`
const createClass = (class_number, school_id) => row(createClassSQL, class_number, school_id)

//select classes
const selectClassesSQL = `
    select * from classes
    where
        school_id = $1
    order by
        id;
`
const selectClasses = (school_id) => rows(selectClassesSQL, school_id)

//delete class
const deleteClassSQL = `
    delete from classes
        where id = $1
    returning *
`
const deleteClass = (class_id) => row(deleteClassSQL, class_id)

//update class
const updeteClassSQL = `
    update classes set
        class = coalesce($2, class),
        school_id = coalesce($3, school_id)
    where
    id = $1
    returning *
`
const updeteClass = (class_id, class_number, school_id) => row(updeteClassSQL, class_id, class_number, school_id)


//------------------------
// create parent
const createParentSQL = `
    insert into parents(phone, password, parent, class_id) values ($1, $2, $3, $4) returning *
`
const createParent = (phone, password, parent, class_id) => row(createParentSQL, phone, password, parent, class_id)


module.exports.createClass = createClass
module.exports.selectClasses = selectClasses
module.exports.deleteClass = deleteClass
module.exports.updeteClass = updeteClass
module.exports.createParent = createParent