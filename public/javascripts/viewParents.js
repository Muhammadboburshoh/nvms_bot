const locationHost = window.location.href.split("/")
const class_id = locationHost[locationHost.length - 1]

const allClasses = document.querySelectorAll(".parent_link")

for(let CLASS of allClasses) {
    if(class_id === CLASS.dataset.id) {
        CLASS.classList.add("parent_active")
    }
}

//delete parent
const deleteBtns = document.querySelectorAll(".categories__delete-btn")

for(let btn of deleteBtns) {
    btn.addEventListener("click", async () => {
        let deleteRes = await fetch(`${HOST}/parent/` + btn.dataset.id, {
            method: "DELETE"
        })

        if(deleteRes.status > 200 && deleteRes.status < 300) {
            location.href = `${HOST}/parents/${class_id}`
        }
    })
}


//update parent
const parents = document.querySelectorAll(".categories__tbody-tr")
const editBtns = document.querySelectorAll(".categories__edit-btn")

for(let [i, btn] of editBtns.entries()) {
    btn.addEventListener("click", async () => {
        btn.innerHTML = "tasdqilash"
        btn.classList.add("categories__edit-succesiful")

        let parentInput = document.createElement("INPUT")
        let parentPhone = document.createElement("INPUT")
        let parentPassword = document.createElement("INPUT")

        parentInput.classList.add("category__create-input", "class_edit-input")
        parentPhone.classList.add("category__create-input", "class_edit-input")
        parentPassword.classList.add("category__create-input", "class_edit-input")

        if(btn.dataset.update === "0") {
            btn.dataset.update = "1"

            parentInput.defaultValue = parents[i].childNodes[1].innerHTML.trim()
            parents[i].childNodes[1].innerHTML = ""
            parents[i].childNodes[1].appendChild(parentInput)

            parentPhone.defaultValue = parents[i].childNodes[3].innerHTML.trim()
            parents[i].childNodes[3].innerHTML = ""
            parents[i].childNodes[3].appendChild(parentPhone)

            parentPassword.defaultValue = parents[i].childNodes[5].innerHTML.trim()
            parents[i].childNodes[5].innerHTML = ""
            parents[i].childNodes[5].appendChild(parentPassword)
        }
        else if (btn.dataset.update === "1") {
            parentInputValues = document.querySelectorAll(".category__create-input")

        }
    })
}
