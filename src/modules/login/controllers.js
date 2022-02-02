const router = require("express").Router()

const admin = require("./model")
const { sign } = require("../../../util/jwt")
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
    const user = await admin.adminLogin(req.body)

    if(user) {
        const accessToken = sign(user)
        res.status(201).send({ user, accessToken })
    }
    else {
        res.status(401).end()
    }
})

module.exports = router