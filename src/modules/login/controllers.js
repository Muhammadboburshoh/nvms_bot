const router = require("express").Router()

const admin = require("./model")
const { sign, verify } = require("../../../util/jwt")
const { site_host } = require("../../../config")

/*
    admin login page get
*/
router.get("/", async(req, res) => {
    res.render("login", {site_host: site_host})
})

/*
    Admin Login
*/
router.post("/", async (req, res) => {
    const school = await admin.schoolLogin(req.body)

    if(school) {
        const accessToken = sign(school)
        res.cookie('__auth', {access_token: accessToken, school})
        res.redirect('/')
    }
    else {
        res.status(401)
        res.redirect('/')
    }
})

module.exports = router