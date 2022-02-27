; (async () => {
    let response = await fetch(`${HOST}/classes`)
    response = await response.json()

    const section = document.querySelector(".parents-select")
    for (let i of response) {
        let option = document.createElement("OPTION")

        option.textContent = i.class + " - sinf"
        option.value = i.class_id

        section.appendChild(option)
    }
})()