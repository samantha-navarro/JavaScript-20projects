// DOM ELEMENTS
const toggle = document.getElementById('toggle');
const close = document.getElementById('close');
const open = document.getElementById('open');
const modal = document.getElementById('modal');

// toggle nav
toggle.addEventListener('click', () => {
  document.body.classList.toggle('show-nav');
});

// show modal
open.addEventListener('click', () => {
  modal.classList.add('show-modal');
});

// remove show modal class (hide modal)
close.addEventListener('click', () => {
  modal.classList.remove('show-modal');
});

// being able to hide modal even when outside of the container (conditional)
window.addEventListener('click', (e) => {
  e.target == modal ? modal.classList.remove('show-modal') : false;
});
