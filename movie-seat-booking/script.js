// DOM ELEMENTS

const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seats:not(occupied)');
// getting rows seats that not occupied
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

let ticketPrice = +movieSelect.value;

console.log(typeof ticketPrice);
// using + after movieSelect will make the string into a number

// FUNCTIONS

function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');
  //   console.log(selectedSeats);

  //   get length of node list
  const selectedSeatsCount = selectedSeats.length;
  // console.log(selectedSeatsCount);

  // change text of 0  and total to selected count and total
  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}

// MOVIE SEAT EVENT

movieSelect.addEventListener('change', (e) => {
  ticketPrice = +e.target.value;
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
