const router = require("express").Router()

const home = require("./model")
const { sign, verify } = require("../../../util/jwt")
const { site_host } = require("../../../config")

/*
    middleware
*/
const middleware = async (req, res, next) => {

    if(req.cookies.__auth) {
        const { access_token } = req.cookies.__auth
    
        if(!access_token) {
            return res.sendStatus(401)
        }
        else {
            try {
                const school = await verify(access_token)
                if(school) {
                    next()
                }
                else {
                    return res.redirect("/login")
                }
            } catch(e) {
                res.redirect("/login")
            }
        }
    } else {
        return res.redirect("/login")
    }
}

/*
    Get home page
*/
router.get("/", middleware, async(req, res) => {

    const { access_token } = req.cookies.__auth

    try {
        if(access_token) {
            const school = await verify(access_token)
            if(school) {
                res.render("index", {site_host: site_host, name: school.name})
            }
            else {
                res.status(401).end()
            }
        }
        else {
            res.status(401).end()
        }
    }
    catch(err) {
        res.status(401).end()
    }
})

/*
    Create class POST method
*/
router.post("/class", middleware, async(req, res) => {
    const { school } = req.cookies.__auth

    const class_number = req.body.class_number
    if(school) {
        try{
            const newClass = await home.createClass(class_number, school.school_id)
            if(newClass) {
                res.render("successful", {site_host})
            }
            else{
                res.status(401).end()
            }
        }catch(err) {
            res.status(401).end()
        }
    }
    else {
        res.status(401).end()
    }
})

/*
    select All classes GET method
*/
router.get("/classes", middleware, async(req, res) => {
    const { school } = req.cookies.__auth
    if(school) {
        const classes = await home.selectClasses(school.school_id)
        res.status(200).send(classes)
    }
    else {
        res.status(401).end()
    }
})

/*
    Delete class DELETE method
*/
router.delete("/class/:id", middleware, async (req, res) => {
    const class_id = req.params.id
    const deleteClass = await home.deleteClass(class_id)
    if(deleteClass) {
        res.status(201).end()
    }
    else {
        res.status(403).end()
    }
})

/*
    Update class PUT method
*/
router.put("/class/:id", middleware, async (req, res) => {
    const class_id = req.params.id
    const { school } = req.cookies.__auth
    const { class_number } = req.body

    try {
        const updeteClass = await home.updeteClass(class_id, class_number, school.school_id)
        if(updeteClass) {
            res.status(201).end()
        }
        else {
            res.status(403).end()
        }
    } catch(e) {
        res.status(403).end()
    }
})


//------------------
/*
    create parents GET method
*/
router.get("/c/parents", middleware, async(req, res) => {

    const { access_token } = req.cookies.__auth

    try {
        if(access_token) {
            const school = await verify(access_token)
            if(school) {
                res.render("parents", {site_host: site_host, name: school.name})
            }
            else {
                res.status(401).end()
            }
        }
        else {
            res.status(401).end()
        }
    }
    catch(err) {
        res.status(401).end()
    }
})

/*
    create parents GET method
*/
router.post("/parent", middleware, async (req, res) => {
    const phone = req.body.phone
    const password = req.body.password
    const parent = req.body.parent
    const class_id = req.body.class_id

    const { school } = req.cookies.__auth
    if(school) {
        try{
            const newParent = await home.createParent(phone, password, parent, class_id)
            if(newParent) {
                res.render("successful", {site_host})
            }
            else{
                res.status(401).end()
            }
        }catch(err) {
            res.status(401).end()
        }
    }
    else {
        res.status(401).end()
    }
})

/*
    view parent page
*/
router.get("/parents/:id", middleware, async (req, res) => {
    let class_id = req.params.id
    const { school } = req.cookies.__auth

    const parents = await home.parentsAll(school.school_id, class_id);
    const classes = await home.selectClasses(school.school_id)

    try {
        if(school) {
            res.render("viewParents",
            {
                site_host: site_host,
                parents: parents,
                name:school.name,
                classes: classes
            })
        }
    } catch(e) {
        req.status(401).end()
    }
})

/*
    delete parent method
*/
router.delete("/parent/:id", middleware, async (req, res) => {
    const parent_id = req.params.id
    const deleteParent = await home.deleteParent(parent_id)
    if(deleteParent) {
        res.status(201).end()
    }
    else {
        res.status(403).end()
    }
})

/*
    update parent method
*/
router.put("/parrent/:id", middleware, async (req, res) => {
    const parent_id = req.params.id
    const { parent, phone, password, class_id } = req.body

    console.log(class_id);
    try {
        const updateParent = await home.updateParent(parent_id, parent, phone, password, class_id)
        if(updateParent) {
            res.status(201).end()
        }
        else {
            res.status(403).end()
        }
    } catch(e) {
        res.status(403).end()
    }
})


module.exports = router