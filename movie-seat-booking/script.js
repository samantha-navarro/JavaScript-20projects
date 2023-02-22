// DOM ELEMENTS

const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
// getting rows seats that not occupied
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

populateUI();

let ticketPrice = +movieSelect.value;

console.log(typeof ticketPrice);
// using + after movieSelect will make the string into a number

// FUNCTIONS

function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');
  //   console.log(selectedSeats);

  //   LOCAL STORAGE
  // Copy selected seats into arr.
  // Map through arr.
  // Return a new array indexs
  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));

  console.log(seatsIndex);

  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

  //   get length of node list
  const selectedSeatsCount = selectedSeats.length;
  // console.log(selectedSeatsCount);

  // change text of 0  and total to selected count and total
  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}

// Save selected movie index and price

function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem('selectedMovieIndex', movieIndex);

  localStorage.setItem('selectedMoviePrice', moviePrice);
}

// get data from localstorage and populate UI
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

// MOVIE SEAT EVENT

movieSelect.addEventListener('change', (e) => {
  ticketPrice = +e.target.value;

  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

// SEAT CLICK EVENT
// allows the seat to be targeted once clicked in the container
container.addEventListener('click', (e) => {
  if (
    e.target.classList.contains('seat') &&
    !e.target.classList.contains('occupied')
  ) {
    // console.log(e.target)
    e.target.classList.toggle('selected');

    updateSelectedCount();
  }
});

// Initial count and total set
updateSelectedCount();
