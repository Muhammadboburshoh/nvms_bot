const router = require("express").Router()
const path = require("path")

const home = require("./model")
const { verify } = require("../../../util/jwt")
const { site_host } = require("../../../config")

/*
    middleware
*/
const middleware = async (req, res, next) => {

    if(req.cookies.__auth) {
        const { access_token } = req.cookies.__auth
    
        if(!access_token) {
            return res.redirect("/login")
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

const adminMiddleware = async (req, res, next) => {

    if(req.cookies.__auth) {
        const { accessToken } = req.cookies.__auth
    
        if(!accessToken) {
            return res.redirect("/login/admin")
        }
        else {
            try {
                const school = await verify(accessToken)
                if(school) {
                    next()
                }
                else {
                    return res.redirect("/login/admin")
                }
            } catch(e) {
                res.redirect("/login/admin")
            }
        }
    } else {
        return res.redirect("/login/admin")
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
                // res.status(201).send("ABS")
                res.render("successful", {site_host, url: "/"})
            }
            else{
                res.status(404).end()
            }
        }catch(err) {
            if(err.constraint === "class_index") {
                res.send(`Bir xil sinf kiritayapsiz bu esa xato!
                        <a class="go_home" href="/">
                            <img src="${site_host}/images/pngwing.png" width="30" height="30" alt="">
                            <span>Go Home</span>
                        </a>`)
            }
            else {
                res.status(403).end()
            }
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
        res.status(201).send(classes)
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
                res.render("successful", {site_host, url: "/c/parents"})
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


/*
    admin home
*/
router.get("/admin/home", adminMiddleware, async (req, res) => {

    const { accessToken } = req.cookies.__auth

    try {
        const schools = await home.allSchools()
        if(accessToken) {
            const mainAdmin = await verify(accessToken)
            if(mainAdmin) {
                res.render("adminHome", {site_host: site_host, name: mainAdmin.login, schools})
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
    create school
*/
router.post("/admin/home", adminMiddleware, async(req, res) => {
    try {
        const newSchool = await home.createSchool(req.body)
        if(newSchool){
            res.render("successful", {site_host, url: "/admin/home"})
        }
        else {
            res.status(401).end()
        }
    } catch(err) {
        res.status(401).end()
    }
})

/*
    all schools list
*/
router.get("/admin/schools", adminMiddleware, async(req, res) => {
    try {
        const schools = await home.allSchools()
        if(schools) {
            res.status(201).send(schools)
        }
        else {
            res.status(403).end()
        }
    } catch(err) {
        res.status(401).end()
    }
})

/*
    delete school
*/
router.delete("/admin/school/:id", adminMiddleware, async(req, res) => {
    const school_id = req.params.id
    try {
        const deleteSchool = await home.deleteSchool(school_id)
        if(deleteSchool) {
            res.status(201).end()
        }
        else {
            res.status(403).end()
        }
    } catch(err) {
        res.status(401).end()
    }
})

/*
    update school
*/
router.put("/admin/school/:id", adminMiddleware, async(req, res) => {
    const school_id = req.params.id
    const { name, login, password } = req.body

    try {
        const updateSchool = await home.updateSchool(school_id, name, login, password)
        if(updateSchool) {
            res.status(201).end()
        }
        else {
            res.status(403).end()
        }
    } catch(e) {
        console.log(e);
        res.status(403).end()
    }
})

/*
    file upload get html page
*/
router.get("/upload", middleware, async(req, res) => {

    const { access_token } = req.cookies.__auth
    try {
        if(access_token) {
            const school = await verify(access_token)
            if(school) {
                res.render("upload", {site_host: site_host, name: school.name})
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
    file upload post method
*/
router.post("/upload", async (req, res) => {
    try {
        let { attendanceFile } = req.files
        const uploadFilePath = path.join(__dirname, "../", "../", "../", "../", "nvms_bot", "attendance_files", attendanceFile.name)

        if(attendanceFile) {
            const a = attendanceFile.mv(uploadFilePath, (err) =>{
                if(!err) {
                    res.render("successful", {site_host, url: "/upload"})
                }
                else {
                    res.status(401).end()
                }
            })
        }
        else {
            res.status(404).end()
        }
    }
    catch(err) {
        res.status(403).end()
    }
})

module.exports = router