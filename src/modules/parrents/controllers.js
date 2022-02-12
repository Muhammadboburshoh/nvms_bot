const router = require("express").Router()

const home = require("./model")
const { sign, verify } = require("../../../util/jwt")
const { site_host } = require("../../../config")

/*
    Get home page middleware
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

router.get("/classes", middleware, async(req, res) => {
    const { school } = req.cookies.__auth
    if(school) {
        const classes = await home.selectClasses()
        res.status(200).send(classes)
    }
    else {
        res.status(401).end()
    }
})



module.exports = router