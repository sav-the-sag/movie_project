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
// create api function using fetch then return

var getOmdb = function (title) {
  //event.preventDefault();
  var omdbApiUrl = "http://www.omdbapi.com/?apikey=" + omdbApiKey + "&t=" + title + "&type=movie&plot=short";

  fetch(omdbApiUrl)
    .then(function (response) {
      return response.json()
    })
    .then(function (data) {
      plot = data.Plot;
      var plotInfo = document.querySelector("#plot");
      plotInfo.textContent = plot;
    })
}

