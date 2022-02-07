const router = require("express").Router()

const home = require("./model")
const { sign, verify } = require("../../../util/jwt")
const { site_host } = require("../../../config")

/*
    Get home page
*/
router.get("/", async(req, res) => {

    try {
        const user = await verify(req.headers.access_token)
        if(user) {
            res.render("index", {site_host: site_host})
        }
        else {
            res.status(400).end()
        }
    }
    catch(err) {
        res.statusMessage = err
        res.status(401).end()
        console.log(err);
    }
    

    // try {

    //     const user = await verify(req.headers.access_token)
    //     if(user)
    //     res.render("index", {site_host: site_host})
    // }
    // catch(err) {
    //     res.statusMessage = err
    //     res.status(401).end()
    //     console.log(err);
    // }
})

/*
    Admin Login
*/
// router.post("/", async (req, res) => {
//     const user = await admin.schoolLogin(req.body)

//     if(user) {
//         const accessToken = sign(user)
//         res.status(201).send({ user, accessToken })
//     }
//     else {
//         res.status(401).end()
//     }
// })

module.exports = router