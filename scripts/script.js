// create an app object:
const dogApp = {};

// api url:
dogApp.apiUrl = "https://api.thedogapi.com/v1/breeds/";

// api key:
dogApp.apiKey = "3e69176f-30f7-43b0-a73b-9152505ba7d0";

// storing all the dogs:
dogApp.dogList = [];


// pulling the dog breeds and info from API:
dogApp.getBreed = () => {
  const url = new URL(dogApp.apiUrl);
  url.search = new URLSearchParams({
    "x-api-key": dogApp.apiKey
  })

  // fetch api:
  fetch(url).then((response) => {
    return response.json();
  }).then((jsonResponse) => {

    dogApp.dropdownBreeds(jsonResponse);
    dogApp.dogList = jsonResponse;
  })
};


// populate the dropdown wiht dog breeds:
dogApp.dropdownBreeds = (dogObjects) => {
  document.querySelector('select').innerHTML = "";

  const dropdown = document.querySelector("select");

  dogObjects.forEach((dogObject) => {
    const optionElement = document.createElement("option");

    optionElement.value = dogObject.name;
    optionElement.innerHTML = dogObject.name;
    
    dropdown.appendChild(optionElement);
  })
}


// display the user input on change:
dogApp.getUserInput = function() {
  document.querySelector('#dog-breeds').addEventListener('change', function(){
    document.querySelector('#initial-results').innerHTML = "";
    document.querySelector('#img-div').innerHTML = "";
    document.querySelector('#results-text').innerHTML = "";
    document.querySelector('.results-container').scrollIntoView('#results');

    const breed = this.value;
    dogApp.getBreed(breed);
    
    const title = document.createElement('h2');
    title.classList.add("dog-info-title")
    title.innerText = breed;

    // making a div for a title:
    document.querySelector('#initial-results').appendChild(title);

    // pulling dog info from array:
    const selectedDog = dogApp.dogList.filter(function(dog) {
      return breed === dog.name;
    })[0]

    
    const { name, life_span, temperament, breed_group, height, weight } = selectedDog;
    
    // creating text info for selected dog:
    const paragraph = document.createElement("p");
    paragraph.classList.add("dog-info-text")
    paragraph.innerText = `The ${name} has an average lifespan of ${life_span}. Its common traits include being ${temperament.toLowerCase()}. It belongs to the ${breed_group} breed group. Typically it is ${height.imperial} inches tall (metric: ${height.metric} cm tall), and on average weighs ${weight.imperial} lbs (metric: ${weight.metric} kg).`

    document.querySelector("#results-text").appendChild(paragraph);

    // creating an image for the dog:
    const image = document.createElement('img');
    image.classList.add('image-result')
    image.src = selectedDog.image.url;
    image.alt = `an image of ${breed}`

    const jsImgDiv = document.createElement('div')
    jsImgDiv.classList.add('js-img-div');
    jsImgDiv.appendChild(image);

    document.querySelector('#img-div').appendChild(jsImgDiv);
  })
}


// create init fucntion to house application:
dogApp.init = () => {
  dogApp.getBreed();
  dogApp.getUserInput();
}

// call init function:
dogApp.init();