let profilName = document.querySelector(".profile__name")
profilName.textContent = JSON.parse(localStorage.getItem('__auth')).name