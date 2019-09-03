const dogBar = document.querySelector("#dog-bar")
const allPupsUrl = "http://localhost:3000/pups"
const dogInfo = document.querySelector("#dog-info") 

fetchPups()

function fetchPups() {
    fetch(allPupsUrl)
    .then(resp => resp.json())
    .then(slapPupsOnDom)
}

function slapPupsOnDom(data) {
    data.forEach(pup => {
        let newSpan = document.createElement("span")
        newSpan.innerText = pup.name
        newSpan.id = pup.id
        dogBar.append(newSpan)
    })
}

dogBar.addEventListener("click", fetchSinglePup)

function fetchSinglePup(event) {
    fetch(allPupsUrl + `/${event.target.id}`)
    .then(resp => resp.json())
    .then(singlePupDetails)
}

function singlePupDetails(data) {
    let newImg = document.createElement("img")
    let newH2 = document.createElement("h2")
    let newButton = document.createElement("button")
    newButton.id = data.id
    newButton.classList = "isGoodDogButton"
    newImg.src = data.image
    newH2.innerText = data.name
    data.isGoodDog ? newButton.innerText = "Good Dog!" : newButton.innerText = "Bad Dog!"

    dogInfo.append(newImg, newH2, newButton)
    dogButtonEventListener(data)
}

function dogButtonEventListener(data) {
    let dogButton = document.querySelector(".isGoodDogButton")
    let toggle = !data.isGoodDog
    dogButton.addEventListener("click", function() {
        fetch(allPupsUrl + `/${data.id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            body: JSON.stringify({
              isGoodDog: toggle
            })
        })
        if (dogButton.innerText === "Good Dog!") {
            dogButton.innerText = "Bad Dog!"
        } else {
            dogButton.innerText = "Good Dog!"
        }
    })
}