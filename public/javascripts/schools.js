const deleteBtns = document.querySelectorAll(".categories__delete-btn")

for(let btn of deleteBtns) {
    btn.addEventListener("click", async () => {
        let isRealy = confirm(`Maktani o'chirishga ishonchingiz komilmi.\nMaktabni o'chirsangiz unga bog'langan barcha sinf va ota onalar ro'yxati ham o'chib ketadi!`)

        if(isRealy) {
            let deleteRes = await fetch(`${HOST}/admin/school/` + btn.dataset.id, {
                method: "DELETE"
            })
            console.log(deleteRes);
    
            if(deleteRes.status > 200 && deleteRes.status < 300) {
                location.href = `${HOST}/admin/home`
            }
        }
    })
}


const editBtns = document.querySelectorAll(".categories__edit-btn")
const schools = document.querySelectorAll(".categories__tbody-tr")

for(let [i, btn] of editBtns.entries()) {
    btn.addEventListener("click", async () => {
        btn.innerHTML = "tasdiqlash"
        btn.classList.add("categories__edit-succesiful")

        let schoolNameInput = document.createElement("INPUT")
        let loginInput = document.createElement("INPUT")
        let passwordInput = document.createElement("INPUT")

        schoolNameInput.classList.add("category__create-input", "class_edit-input")
        loginInput.classList.add("category__create-input", "class_edit-input")
        passwordInput.classList.add("category__create-input", "class_edit-input")

        if(btn.dataset.update === "0") {
            btn.dataset.update = "1"

            schoolNameInput.defaultValue = schools[i].childNodes[1].innerHTML.trim()
            loginInput.defaultValue = schools[i].childNodes[3].innerHTML.trim()
            passwordInput.defaultValue = ""

            schools[i].childNodes[1].innerHTML = ""
            schools[i].childNodes[3].innerHTML = ""
            schools[i].childNodes[5].innerHTML = ""

            schools[i].childNodes[1].appendChild(schoolNameInput)
            schools[i].childNodes[3].appendChild(loginInput)
            schools[i].childNodes[5].appendChild(passwordInput)
        }
        else if(btn.dataset.update === "1") {
            newClassValue = document.querySelectorAll(".class_edit-input")

            if(newClassValue[0].value && newClassValue[1].value && newClassValue[2].value) {
                let editRes = await fetch(`${HOST}/admin/school/` + btn.dataset.id, {
                    method: "PUT",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        name: newClassValue[0].value,
                        login: newClassValue[1].value,
                        password: newClassValue[2].value
                    })
                })
    
                if(editRes.status > 200 && editRes.status < 300) {
                    location.href = `${HOST}/admin/home`
                }
            }
        }
    })
}