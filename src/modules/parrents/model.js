const { row, rows } = require("../../../util/db")

// class created
const createClassSQL = `
    insert into classes(class, school_id) values($1, $2) returning *
`
const createClass = (class_number, school_id) => {
    console.log(class_number, school_id);
    return row(createClassSQL, class_number, school_id)
}

//select classes
const selectClassesSQL = `
    select * from classes
    where
        school_id = $1
    order by
        class_id;
`
const selectClasses = (school_id) => rows(selectClassesSQL, school_id)

//delete class
const deleteClassSQL = `
    delete from classes
        where class_id = $1
    returning *
`
const deleteClass = (class_id) => row(deleteClassSQL, class_id)

//update class
const updeteClassSQL = `
    update classes set
        class = coalesce($2, class),
        school_id = coalesce($3, school_id)
    where
    class_id = $1
    returning *
`
const updeteClass = (class_id, class_number, school_id) => row(updeteClassSQL, class_id, class_number, school_id)


//------------------------
// create parent
const createParentSQL = `
    insert into parents(phone, password, parent, class_id) values ($1, $2, $3, $4) returning *
`
const createParent = (phone, password, parent, class_id) => row(createParentSQL, phone, password, parent, class_id)

const firstClassSQL = `
    select * from
        classes
    where
        school_id = $1
    order by
        parent_id
    limit 1
`
const firstClass = (school_id) => row(firstClassSQL, school_id)

const parentsAllSQl = `
    select
        p.parent_id,
        p.phone,
        p.password,
        p.parent,
        c.school_id,
        c.class
    from
        parents as p
    inner join classes c on
        c.class_id = p.class_id
    where
        c.school_id = $1 and c.class_id = $2
`
const parentsAll = (school_id, class_id) => rows(parentsAllSQl, school_id, class_id)

//parent delete 
const deleteParentSQL = `
    delete from parents
        where id = $1
    returning *
`
const deleteParent = (parent_id) => row(deleteParentSQL, parent_id)

module.exports.createClass = createClass
module.exports.selectClasses = selectClasses
module.exports.deleteClass = deleteClass
module.exports.updeteClass = updeteClass

module.exports.createParent = createParent
module.exports.firstClass = firstClass
module.exports.parentsAll = parentsAll
module.exports.deleteParent = deleteParent