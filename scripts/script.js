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

    console.log(jsonResponse);
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
    document.querySelector('#initial-results').innerHTML = "";
    document.querySelector('#img-div').innerHTML = "";
    document.querySelector('#results-text').innerHTML = "";
    const breed = this.value;
    dogApp.getBreed(breed);
    // console.log(breed)
    
    const title = document.createElement('h2');
    title.classList.add("dog-info-title")
    // title.innerText = "";
    title.innerText = breed;
    // console.log(title)

  
    // making a div for a title:
    // const titleDiv = document.createElement('div')
    // titleDiv.classList.add('title-div');
    // titleDiv.appendChild(title);
    document.querySelector('#initial-results').appendChild(title);


    // pulling dog info from array:
    const selectedDog = dogApp.dogList.filter(function(dog) {
      return breed === dog.name;
    })[0]
    console.log(selectedDog);

    const { name, life_span, temperament, breed_group, origin, height, weight } = selectedDog
    

    const paragraph = document.createElement("p");
    paragraph.classList.add("dog-info-text")
    paragraph.innerText = `The ${name} has an average lifespan of ${life_span}. Its common traits include ${temperament}. They belong to the ${breed_group} breed group and its origins are ${origin}. Typically they are ${height.imperial} inches tall (metric: ${height.metric} cm tall), and on average weigh ${weight.imperial} lbs (metric: ${weight.metric} kg).`


    

    // if (origin === "") {
    //   let originStatement = "unknown";
    // }



    document.querySelector("#results-text").appendChild(paragraph);

    // console.log(selectedDog);
    
    // creating an image for the dog:
    const image = document.createElement('img');
    image.classList.add('image-result')
    image.src = selectedDog.image.url;
    image.alt = `an image of ${breed}`

    // creating temerament info for selected dog
    // const temperament = document.createElement("p")


    document.querySelector('#img-div').appendChild(image);
  })
}

// trying to get info but not working
// need to decide whether to use css for this instead.
dogApp.getDogInfo = function() {
  document.querySelector('#img-div').addEventListener('click', function() {
    document.querySelector('#initial-results').innerHTML = "";
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