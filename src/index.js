const dogBar = document.querySelector("#dog-bar") //where we want changes
const allPupsUrl = "http://localhost:3000/pups"  //fetch api url location
const dogInfo = document.querySelector("#dog-info")

fetchPups()  //calling onto url

function fetchPups() { // create fetch function
    fetch(allPupsUrl) // pass in api url
    .then(resp => resp.json()) //stringify(json object array like object)
    .then(slapPupsOnDom) //data from block 12
}

function slapPupsOnDom(data) {
    data.forEach(pup => {
        let newSpan = document.createElement("span")
        newSpan.innerText = pup.name
        newSpan.id = pup.id // to reference specific pup
        dogBar.append(newSpan)
    })
}

dogBar.addEventListener("click", fetchSinglePup)

function fetchSinglePup(event) {
    fetch(allPupsUrl + `/${event.target.id}`)
    .then(resp => resp.json())
    .then(singlePupDetails)
}

function singlePupDetails(data){
    let newImg = document.createElement("img")
    let newH2 = document.createElement("h2")
    let newButton = document.createElement("button")
    newButton.classList = "isGoodDogButton"
    newImg.src = data.image
    newH2.innerText = data.name
    newButton.id = data.id
    data.isGoodBoy ? newButton.innerText = "Good Dog!" :newButton.innerText = "Bad Dog!"
    
    dogInfo.append(newImg, newH2, newButton)
    dogButtonEventListener(data)
}

function dogButtonEventListener(data){
    let dogButton = document.querySelector(".isGoodDogButton")
    let toggle = !data.isGoodDog
    dogButton.addEventListener("click",function(){
        fetch(allPupsUrl + `/${data.id}`,{
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
             },
        body: JSON.stringify({
            isGoodDog: toggle
            })
        })
        .then(resp => resp.json())
        if (dogButton.innerText === "Good Dog!") {
            dogButton.innerText = "Bad Dog!"
        }
        else {
            dogButton.innerText = "Good Dog!"
        }
        })
    }
