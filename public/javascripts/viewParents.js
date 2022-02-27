const locationHost = window.location.href.split("/")
const class_id = locationHost[locationHost.length - 1]

const allClasses = document.querySelectorAll(".parent_link")

for(let CLASS of allClasses) {
    if(class_id === CLASS.dataset.id) {
        CLASS.classList.add("parent_active")
    }
}

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


console.log();


