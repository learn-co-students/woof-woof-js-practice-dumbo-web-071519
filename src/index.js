
const dogBar = document.getElementById("dog-bar")
const dogDiv = document.querySelector("#dog-info")

function showDogs(dogObjects){
  dogObjects.forEach(function(dog){
    let span = document.createElement("span")
    span.innerText = dog.name
    span.dataset.dogId = dog.id
    span.dataset.good = dog.isGoodDog
    dogBar.append(span)
  })
}

dogBar.addEventListener("click", function(e){
  if(event.target.tagName === "SPAN"){
    fetch(`http://localhost:3000/pups/${event.target.dataset.dogId}`)
      .then(resp => resp.json())
      .then(data => addSpecificDog(data))
  }
})

function addSpecificDog(data){
  dogDiv.innerHTML = `
  <h2>${ data.name }</h2><br>
  <img src=${ data.image }><br>
  <button data-dog-id = ${data.id}  data-dog-good-boy = ${data.isGoodDog} > ${ data.isGoodDog == true ? "GOOD BOY" : "BAD DOG" } </button>`
}

dogDiv.addEventListener("click", function(event){
  if (event.target.tagName === "BUTTON") {
    let goodOrBad = (event.target.dataset.dogGoodBoy == "true" ) ? false : true
    // let goodOrBad = event.target.dataset.dogGoodBoy
    console.log(goodOrBad)

    fetch(`http://localhost:3000/pups/${event.target.dataset.dogId}`, {
      method: "PATCH",
      headers: {
      "Content-Type": "application/json"
      },
      body: JSON.stringify({
        isGoodDog: goodOrBad
      })
    })
    .then(resp => resp.json())
    .then(data => {
      event.target.dataset.dogGoodBoy = data.isGoodDog
      event.target.innerText = `${ data.isGoodDog == true ? "GOOD BOY" : "BAD DOG" }`
    })
  }
})


document.addEventListener("DOMContentLoaded", function(){
  fetch("http://localhost:3000/pups")
  .then(res => res.json())
  .then(dogObjects => {
    console.log(dogObjects)
    showDogs(dogObjects)
  })
})

let filter = document.querySelector("#good-dog-filter")
filter.addEventListener('click', function(event){
  // let currentStatus = event.target.dataset.filter
  let afterClickStatus = (event.target.dataset.filter == "off" ) ? "on" : "off"
  event.target.dataset.filter = afterClickStatus
  console.log(afterClickStatus)
  console.log(event.target.dataset.filter)
  const spans = document.querySelectorAll("[data-dog-id]")
  if (afterClickStatus === "on"){
    event.target.innerText = "Filter good dogs: ON"
    spans.forEach(function(span){if (span.dataset.good == "false"){span.style.visibility = "hidden"}})
  }
  else {
    event.target.dataset.filter == afterClickStatus
    event.target.innerText = "Filter good dogs: OFF"
    spans.forEach(span => span.style.visibility="visible")
  }

}
)
