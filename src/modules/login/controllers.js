const router = require("express").Router()

const admin = require("./model")
const { sign } = require("../../../util/jwt")
const { site_host } = require("../../../config")

/*
    school login GET method
*/
router.get("/", async(req, res) => {
    res.render("login", {site_host: site_host})
})

/*
    school Login POST method
*/
router.post("/", async (req, res) => {
    const school = await admin.schoolLogin(req.body)

    if(school) {
        const accessToken = sign(school)
        res.cookie('__auth', {access_token: accessToken, school}, {maxAge: 1000 * 60 * 60 * 24 * 7, httpOnly: true})
        res.redirect('/')
    }
    else {
        res.status(401)
        res.redirect('/')
    }
})

/*
    main admin login
*/

router.get("/admin", async(req, res) => {
    res.render("adminLogin", {site_host: site_host})
})

router.post("/admin", async (req, res) => {
    const mainAdmin = await admin.adminLogin(req.body)

    if(mainAdmin) {
        const accessToken = sign(mainAdmin)
        res.cookie('__auth', {accessToken, mainAdmin}, {maxAge: 1000 * 60 * 60 * 24, httpOnly: true})
        res.redirect('/admin/home')
    }
    else {
        res.redirect('/login/admin')
        res.status(401)
    }
})


module.exports = router