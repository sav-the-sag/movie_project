var movieEntries=[]
var movieObject={
  movieTitle:"",
  plot:"",
  year:"",
  linkForTrailer:"",
  userComments:""
}
var linkForTrailer=""

document.addEventListener('DOMContentLoaded', () => {
  // Functions to open and close a modal
  function openModal($el) {
    $el.classList.add('is-active');
  }

  function closeModal($el) {
    $el.classList.remove('is-active');
  }

  function closeAllModals() {
    (document.querySelectorAll('.modal') || []).forEach(($modal) => {
      closeModal($modal);
    });
  }

  // Add a click event on buttons to open a specific modal
  (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
    const modal = $trigger.dataset.target;
    const $target = document.getElementById(modal);

    $trigger.addEventListener('click', (event) => {
      event.preventDefault();
      var titleInput = document.querySelector("#search-input");
      var title = titleInput.value;
      openModal($target);
      getOmdb(title);
      getYoutube(title);
    });
  });

  // Add a click event on various child elements to close the parent modal
  (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
    const $target = $close.closest('.modal');

    $close.addEventListener('click', () => {
      closeModal($target);
    });
  });

  // Add a keyboard event to close all modals
  document.addEventListener('keydown', (event) => {
    if (event.code === 'Escape') {
      closeAllModals();
    }
  });
});

var titleInput = document.querySelector("#search-input");
var plot = "666"
var year = ""
var movieTitle = ""
var linkForTrailer=""
var userComments=""
// create api function using fetch then return

var getOmdb = function (title) {
  //event.preventDefault();
  var omdbApiUrl = "http://www.omdbapi.com/?apikey=" + omdbApiKey + "&t=" + title + "&type=movie&plot=short";

  fetch(omdbApiUrl)
    .then(function (response) {
      return response.json()
    })
    .then(function (data) {
      movieTitle = data.Title;
      var movieTitleInfo = document.querySelector("#title");
      movieTitleInfo.textContent = movieTitle;

        plot = data.Plot;
      var plotInfo = document.querySelector("#plot");
      plotInfo.textContent = "Plot description: " + plot;

      year = data.Year;
      var yearInfo = document.querySelector("#year");
      yearInfo.textContent = "Year released: " + year;
    })
}


function getYoutube(title) {
  var youtubeApiUrl = 'https://www.googleapis.com/youtube/v3/search?key=' + youtubeApiKey + '&part=snippet&type=video&maxResults=1&q=' + title + 'movie trailer';

  fetch(youtubeApiUrl)
    .then(function(response) {
      return response.json()
    })
    .then(function (data) {
      var videoID = data.items[0].id.videoId
      console.log(videoID)
      var trailerLink = document.querySelector('#youtube')
      linkForTrailer='https://www.youtube.com/watch?v='+videoID
      trailerLink.setAttribute('href', linkForTrailer)
      
      
    })
}

function addingDataLocalStorage(event){
  event.preventDefault();  
  userComments=document.querySelector('#userInputComments').value;
  var newMovie=Object.create(movieObject)
  newMovie.movieTitle=movieTitle
  newMovie.plot=plot
  newMovie.year=year
  newMovie.linkForTrailer=linkForTrailer
  newMovie.userComments=userComments
  console.log(newMovie)
  movieEntries.push(newMovie)
  localStorage.setItem('movieEntries',JSON.stringify(movieEntries));
  addSearchHistory();
  addDataToCard();
  
}

var submitBtn = document.querySelector('#submitBtn')
submitBtn.addEventListener('click', (event) => {
  event.preventDefault();
  
  function closeModal($el) {
    $el.classList.remove('is-active');
  }

  function closeAllModals() {
    (document.querySelectorAll('.modal') || []).forEach(($modal) => {
      closeModal($modal);
    });
  }
  closeAllModals();
submitBtn.addEventListener('click',addingDataLocalStorage(event))
 
})

function addSearchHistory(){
  var newSearch=document.createElement('li');
  newSearch.textContent=movieTitle;
  document.querySelector("#search-history").appendChild(newSearch)

  }

  function addDataToCard(){
    
  document.querySelector("#movieName").textContent=movieTitle  
  document.querySelector("#plotDescription").textContent=plot  
  document.querySelector("#yearReleased").textContent=year  
  document.querySelector("#trailerLink").textContent=linkForTrailer  
  document.querySelector("#userComments").textContent=userComments  

  }
