// ======================
// Do NOT edit lines 1-23
// ======================

// Save API key and hide initial setup when Save Key button is clicked
document.getElementById("keySubmit").addEventListener("click", () => {
    saveKey();
    hideKeySetup();
});

// Get search term user enters when Search button is clicked
//     Only get images from Unsplash if a search term was inputted
document.getElementById("searchSubmit").addEventListener("click", () => {
  const term = document.getElementById("searchTerm").value.trim();

  if (term) {
    getImages(term);
  }
});

// ======================
// Do NOT edit lines 1-23
// ======================



/*
    TO-DO: Finish the saveKey function:
           - Get the API key the user inputted (hint: look at the HTML for how to access this value)
           - Remove any leading and trailing whitespaces from the user input
           - Only use the Storage API to save the API key if one was inputted
*/
function saveKey() {
  apiKey = document.getElementById('key').value.trim();
  
  
  if (apiKey){
    localStorage.setItem("apiKey", apiKey);
  } else {
    alert("Enter an API key");
  }

  
}



/*
    TO-DO: Finish the hideKeySetup function:
           - Remove the intial setup from the DOM (hint: look at the HTML to access and JS DOM methods)
           - Update the visibiltity to show the photo gallery search setup (hint: look at the HTML to access and CSS property)
*/
function hideKeySetup() {

  const keySetup = document.getElementById('keySetup');
  keySetup.remove();

  const gallerySetup = document.getElementById('gallerySetup');
  gallerySetup.style.visibility = "visible";
  
}
  

/*
    TO-DO: Finish the getImages function:
           - Make this function async
           - Get the photo gallery (hint: look at the HTML for how to access this)
           - Retrieve the API key from the Storage API
           - Clear previous gallery and show loading message

           - Create a URL that holds:
             - SEARCH PHOTOS endpoint
             - api key
             - term
             - 1 page and 15 photos per page

           - Try:
             - Pause as you wait to get the data from Unsplash API 
             - Convert returned data to JS object
             - Send object and term to displayImages 
           - Catch errors:
             - Output error to console
             - Update photo gallery message to "Something went wrong..." 
*/
async function getImages(term) {
  gallery= document.getElementById("gallery");
  const apiKey= localStorage.getItem("apiKey");
  console.log(apiKey);

  

  gallery.innerHTML =" ";
  gallery.innerHTML= "<p> loading </p>";

   
  const url= 'https://api.unsplash.com/search/photos/?client_id='+apiKey+'&query='+term+'&per_page=15';
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    displayImages(data, term);
  }
  catch (error) {
   console.log(error);
   gallery.innerHTML= "<p> something went wrong </p>"
  }



}

/*
    TO-DO: Finish the displayImages function:
           - Get the photo gallery (hint: look at the HTML for how to access this)
           - Clear loading message or previous results
           - Get the array containing objects with the images

           - If there are no images, update photo gallery message to "No result returned for term." 
           - Otherwise, iterate through results and display up to 15 images:
             - Create a new image for each result
             - Update image source to small URL
             - Update image description to image alt text. If missing, update to search term
             - Update image title tooltip to photographer name. If missing, update to empty string
*/
function displayImages(data, term) {
  photoGall =document.getElementById('gallery');
  photoGall.innerHTML = '';

  const images = data.results

  if(!images) {
    gallery.innerHTML = " No results returned for term. "

  }
   else {

    for (i=0; i<15; i++) {
      const imgdata = images[i]
    
        img = document.createElement('img') 
        img.src= imgdata.urls.small;
        img.alt= imgdata.username;
        img.title = imgdata.user.name;


      photoGall.appendChild(img);
    
    }
    }



  
  
  
  
}