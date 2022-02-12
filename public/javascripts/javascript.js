const HOST = "http://localhost:3002"


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
        editBtn.classList.add("categories__edit-btn")
        thirdTd.appendChild(editBtn)
        tr.appendChild(thirdTd)


        let fourthTd = document.createElement("TD")
        fourthTd.classList.add("categories__tbody-td")
        let deleteBtn = document.createElement("BUTTON")
        deleteBtn.innerHTML = "o'chirish"
        deleteBtn.classList.add("categories__delete-btn")
        fourthTd.appendChild(deleteBtn)
        tr.appendChild(fourthTd)

        fragment.appendChild(tr)
    }
    console.log(fragment);
    tbody.appendChild(fragment)

    console.log(tbody);
})()