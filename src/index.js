const dogBar = document.querySelector("#dog-bar")
const allPupsURL = "http://localhost:3000/pups"
const dogInfo = document.querySelector("#dog-info")


fetchPups()

function fetchPups() {
    fetch(allPupsURL)
    .then(resp => resp.json()) //turns an array-like object into an array
    // which has "data"!!! so now we can do the below:
    .then(data => {

        slapPupsOnTheDOM(data)
        //pulls from URL and slaps it as defined below.
    })  
}

function slapPupsOnTheDOM(data) {
    data.forEach(pup => {
        let newSpan = document.createElement("span")
        newSpan.innerText = pup.name
        newSpan.id = pup.id
        
        dogBar.append(newSpan)
    });
}

//step 3! 
dogBar.addEventListener("click", fetchSinglePup)

function fetchSinglePup(event) {
    // let specificPupURL = allPupsURL + '/${}'
    fetch(allPupsURL + `/${event.target.id}`)
    .then(resp => resp.json())
    .then(singlePupDetails)
    }

function singlePupDetails(data) {
    let newImg = document.createElement("img")
    let newh2 = document.createElement("h2")
    let newButton = document.createElement("button")

    newButton.classList = "isGoodDogButton"

    newImg.src = data.image
    newh2.innerText = data.name
    data.isGoodDog ? newButton.innerText = "Good Dog!" : newButton.innerText = "Bad Dog!"
    dogInfo.append(newImg, newh2, newButton)
    dogButtonEventListener(data)
}

function dogButtonEventListener(data) {
    let dogButton = document.querySelector(".isGoodDogButton")
    let toggle = !data.isGoodDog
    dogButton.addEventListener("click", function(){
        fetch(allPupsURL + `/${data.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                isGoodDog: toggle
            })
        })

        if (dogButton.innerText === "Good Dog!"){
            dogButton.innerText = "Bad Dog!"
        } else {dogButton.innerText = "Good Dog!"
        }
    })

}

