// create an app object
const dogApp = {};

// api url (breeds?)
dogApp.apiUrl = "https://api.thedogapi.com/v1/breeds/";

// api key
dogApp.apiKey = "3e69176f-30f7-43b0-a73b-9152505ba7d0";
// storing all the dogs:
dogApp.dogList = [];


// pulling the dog breeds and info from API
dogApp.getBreed = () => {
  const url = new URL(dogApp.apiUrl);
  url.search = new URLSearchParams({
    "x-api-key": dogApp.apiKey
  })

  // fetch api
  fetch(url).then((response) => {
    return response.json();
  }).then((jsonResponse) => {

    // console.log(jsonResponse);
    dogApp.dropdownBreeds(jsonResponse);
    // dogApp.getUserInput(jsonResponse);
    dogApp.dogList = jsonResponse;
  })
};


// populate the dropdown wiht dog breeds
dogApp.dropdownBreeds = (dogObjects) => {

  const dropdown = document.querySelector("select");

  dogObjects.forEach((dogObject) => {
    const optionElement = document.createElement("option");

    optionElement.value = dogObject.name;
    optionElement.innerHTML = dogObject.name;
    
    // optionElement.appendChild();
    dropdown.appendChild(optionElement);
  })
}

// display the user input on change
dogApp.getUserInput = function() {
  document.querySelector('#dog-breeds').addEventListener('change', function(){
    document.querySelector('#intial-results').innerHTML = "";
    const breed = this.value;
    dogApp.getBreed(breed);
    // console.log(breed)
    
    const title = document.createElement('h2');
    // title.innerText = "";
    title.innerText = breed;
    // console.log(title)

  
    // making a div for a title:
    const titleDiv = document.createElement('div')
    titleDiv.classList.add('title-div');
    titleDiv.appendChild(title);
    document.querySelector('#intial-results').appendChild(titleDiv);


    // pulling dog info from array:
    const selectedDog = dogApp.dogList.filter(function(dog) {
      return breed === dog.name;
    })[0]
    // console.log(selectedDog);
    
    // creating an image for the dog:
    const image = document.createElement('img');
    image.classList.add('image-result')
    image.src = selectedDog.image.url;


    // creating an image container:
    // const imgDiv = document.createElement('div')
    // imgDiv.classList.add('img-div');
    // imgDiv.appendChild(image);
    document.querySelector('#img-div').appendChild(image);
  })
}

// trying to get info but not working
// need to decide whether to use css for this instead.
dogApp.getDogInfo = function() {
  document.querySelector('#img-div').addEventListener('click', function() {
    document.querySelector('#intial-results').innerHTML = "";
    const breed = this.value;
    // dogApp.getBreed(breed);

    console.log(breed)
    // const selectedDogInfo = dogApp.dogList.filter(function(dog) {
    //   return breed === dog.name;
    // })[0]
    // console.log(selectedDogInfo);
  })
}



// on click event, show image for specified breed




// 2nd click event to show details

// create init fucntion to house application
  // call methods

dogApp.init = () => {
  dogApp.getBreed();
  dogApp.getUserInput();
  dogApp.getDogInfo();
}

dogApp.init();