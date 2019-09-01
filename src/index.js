//get dog bar and place spans of dogs in it

//DOM vars
const dogBar = document.querySelector("#dog-bar");

const dogInfo = document.querySelector('#dog-info');
const filterButton = document.querySelector('#good-dog-filter');

const url = "http://localhost:3000/pups"


//event Listeners
dogBar.addEventListener('click', getDogById); 

dogInfo.addEventListener('click',updateDogGoodness);

filterButton.addEventListener('click', filterDogs);


//funcs
//fetch dogs

function getDogById(event) {
    const dogId = event.target.dataset.dogId
    if (dogId) {

        fetch(`${url}/${dogId}`)
            .then(resp => resp.json())
            .then(slapDogInfo)
        console.log(event.target)
    }
}

function getDogs(){
    fetch(url)
    .then(res => res.json())
    .then(dogs => dogs.forEach(slapDogOnTheDom));
}

function slapDogOnTheDom(dogObj){
   const span = document.createElement('SPAN');
   span.innerText = dogObj.name
    span.dataset.dogId = dogObj.id
   dogBar.appendChild(span);
}

function slapDogInfo(doggy){
    dogInfo.innerHTML = `<img src=${doggy.image} height="100%" width=100%"> <h2>${doggy.name}</h2> <button data-dog-id=${doggy.id}>${doggy.isGoodDog ? 'Good Dog!' : 'Bad Dog!'}</button>`
}

function updateDogGoodness(event){
    event.preventDefault()
    const dogId = event.target.dataset.dogId
    if (dogId){
        //console.log(event)
        if(event.target.innerHTML === "Good Dog!"){
            event.target.innerHTML = "Bad Dog!"
            console.log("I smell like  beef",event.target.value)
            changeDogGoodness(dogId, false)
        } else {
            event.target.innerHTML ="Good Dog!"
            console.log("You smell like beef",event.target.value)
            changeDogGoodness(dogId, true)
        }
    }
}

function changeDogGoodness(id, value){
    fetch(`${url}/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            isGoodDog: value
        })
    })
    .then(res => res.json())
    .then(console.log)

}
function filterDogs(event){
    dogBar.innerHTML = " ";
    
    if (event.target.textContent.includes("OFF")) {
        event.target.innerHTML = "Filter good dogs: ON";
        
        changeDogBar(true);
    } else {
        
        event.target.innerHTML = "Filter good dogs: OFF";
        getDogs();
    }
}
function changeDogBar(value){
    fetch(url)
        .then(res => res.json())
        .then(dogs => {
            dogs.forEach(function(dog) {
                if(dog.isGoodDog === value){
                    slapDogOnTheDom(dog)
                }
        })
        })
}

getDogs()

