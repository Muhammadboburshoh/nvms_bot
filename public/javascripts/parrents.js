; (async () => {
    let response = await fetch(`${HOST}/classes`)
    response = await response.json()

    const section = document.querySelectorAll(".parents-select")
    for (let i of response) {
        let option1 = document.createElement("OPTION")
        let option = document.createElement("OPTION")

        option.textContent = i.class + " - sinf"
        option1.textContent = i.class + " - sinf"

        option.value = i.id
        option1.value = i.id

        section[0].appendChild(option)
        section[1].appendChild(option1)
    }

})()