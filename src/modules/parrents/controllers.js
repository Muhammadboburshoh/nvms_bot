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
                    return res.status(401).end()
                }
            } catch(e) {
                res.status(401).end()
            }
        }
    } else {
        return res.status(401).end()
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
            const newClass = await home.createClass(class_number, school.id)
            if(newClass) {
                res.redirect("/")
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
        const classes = await home.selectClasses(school.id)
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
})

/*
    Update class PUT method
*/
router.put("/class/:id", middleware, async (req, res) => {
    const class_id = req.params.id
    const { school } = req.cookies.__auth
    const { class_number } = req.body

    const updeteClass = await home.updeteClass(class_id, class_number, school.id)
    if(updeteClass) {
        res.status(201).end()
    }
})


module.exports = router