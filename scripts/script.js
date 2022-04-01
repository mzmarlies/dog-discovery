// create an app object
const dogApp = {};

// api url (breeds?)
dogApp.apiUrl = "https://api.thedogapi.com/v1/breeds/"

// api key
dogApp.apiKey = "3e69176f-30f7-43b0-a73b-9152505ba7d0"



// define the method to make request to API (appObject.getBreed)
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
    dogApp.displayInfo(jsonResponse);
  })
};

// when search is succesful, display image to screen

dogApp.displayInfo = (dogObjects) => {

  const dropdown = document.querySelector("select");

  dogObjects.forEach((dogObject) => {
    const optionElement = document.createElement("option");

    optionElement.value = dogObject.name;
    optionElement.innerHTML = dogObject.name;

    // optionElement.appendChild();
    dropdown.appendChild(optionElement);
  })
}
// when it fails, show error message / "expand your search"

// forEach loop to allow all matching breeds to show up

// on click event, show details for specified breed

// create init fucntion to house application
  // call methods

dogApp.init = () => {
  dogApp.getBreed();
}

dogApp.init();