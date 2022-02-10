const router = require("express").Router()

const home = require("./model")
const { sign, verify } = require("../../../util/jwt")
const { site_host } = require("../../../config")

const middleware = async (req, res, next) => {
    // req.headers.access_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IjExOC1tYWt0YWIiLCJsb2dpbiI6IjExOCIsImlhdCI6MTY0NDM3Mjc2NSwiZXhwIjoxNjQ3OTcyNzY1fQ.ujjJ33LRQkFEKEJFg42LRJ9ciEazABAnWyBxLopEBsk"



    if(!req.headers.access_token) {
        return res.sendStatus(401)
    }
    else {
        const user = await verify(req.headers.access_token)
        if(user) {
            next()
        }
        else {
            return res.status(401).end()
        }
    }
}

/*
    Get home page
*/
router.get("/", middleware, async(req, res) => {

    res.status(201).render("index", {site_host: site_host})

    // try {
    //     if(req.headers.access_token) {
    //         const user = await verify(req.headers.access_token)

    //         if(user) {
    //             res.render("index", {site_host: site_host})
    //         }
    //         else {
    //             res.status(400).end()
    //         }
    //     }
    //     else {
    //         res.status(400).end()
    //     }
        
    // }
    // catch(err) {
    //     // res.statusMessage = err
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