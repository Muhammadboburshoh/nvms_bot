const router = require("express").Router()

const home = require("./model")
const { sign, verify } = require("../../../util/jwt")
const { site_host } = require("../../../config")

/*
    Get home page middleware
*/
const middleware = async (req, res, next) => {
    const { access_token } = req.cookies

    if(!access_token) {
        return res.sendStatus(401)
    }
    else {
        try {
            const user = await verify(access_token)
            if(user) {
                next()
            }
            else {
                return res.status(401).end()
            }
        } catch(e) {
            res.status(401).end()
        }
    }
}
/*
    Get home page
*/
router.get("/", middleware, async(req, res) => {

    const { access_token } = req.cookies

    try {
        if(access_token) {
            const user = await verify(access_token)
            if(user) {
                res.render("index", {site_host: site_host, name: user.name})
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



module.exports = router