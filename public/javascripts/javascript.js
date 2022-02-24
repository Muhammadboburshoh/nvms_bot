;(async() => {
    let response = await fetch(`${HOST}/classes`)
    const tbody = document.querySelector(".classes")

    response = await response.json()
    let fragment = new DocumentFragment()

    for(let res of response) {
        let tr = document.createElement("TR")
        tr.classList.add("categories__tbody-tr")

        let firstTd = document.createElement("TD")
        firstTd.innerHTML = res.id
        firstTd.classList.add("categories__tbody-td")
        tr.appendChild(firstTd)

        let secontTd = document.createElement("TD")
        secontTd.innerHTML = res.class
        secontTd.classList.add("categories__tbody-td")
        tr.appendChild(secontTd)

        let thirdTd = document.createElement("TD")
        thirdTd.classList.add("categories__tbody-td")
        let editBtn = document.createElement("BUTTON")
        editBtn.innerHTML = "tahrirlash"
        editBtn.dataset.update = "0"
        editBtn.classList.add("categories__edit-btn")
        editBtn.dataset.id = res.id
        thirdTd.appendChild(editBtn)
        tr.appendChild(thirdTd)

        let fourthTd = document.createElement("TD")
        fourthTd.classList.add("categories__tbody-td")
        let deleteBtn = document.createElement("BUTTON")
        deleteBtn.innerHTML = "o'chirish"
        deleteBtn.classList.add("categories__delete-btn")
        deleteBtn.dataset.id = res.id
        fourthTd.appendChild(deleteBtn)
        tr.appendChild(fourthTd)

        fragment.appendChild(tr)
    }
    tbody.appendChild(fragment)

    //delete class
    const deleteBtns = document.querySelectorAll(".categories__delete-btn")
    for(let btn of deleteBtns) {
        btn.addEventListener("click", async () => {

            let deleteRes = await fetch(`${HOST}/class/` + btn.dataset.id, {
                method: "DELETE"
            })

            if(deleteRes.status > 200 && deleteRes.status < 300) {
                location.href = HOST
            }
        })
    }

    //update class
    const editBtns = document.querySelectorAll(".categories__edit-btn")
    const classes = document.querySelectorAll(".categories__tbody-tr")
    
    for(let [i, btn] of editBtns.entries()) {
        btn.addEventListener("click", async () => {

            btn.innerHTML = "tasdiqlash"
            btn.classList.add("categories__edit-succesiful")

            let newInput = document.createElement("INPUT")
            newInput.classList.add("category__create-input")
            newInput.classList.add("class_edit-input")
            if(btn.dataset.update === "0") {
                btn.dataset.update = "1"

                newInput.defaultValue = classes[i].childNodes[1].innerHTML
                classes[i].childNodes[1].innerHTML = ""
                classes[i].childNodes[1].appendChild(newInput)
    
            }
            else if(btn.dataset.update === "1") {
                newClassValue = document.querySelector(".class_edit-input").value

                if(newClassValue) {
                    let editRes = await fetch(`${HOST}/class/` + btn.dataset.id, {
                        method: "PUT",
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({class_number: newClassValue})
                    })
        
                    if(editRes.status > 200 && editRes.status < 300) {
                        location.href = HOST
                    }
                }
            }
        })
    }
})()