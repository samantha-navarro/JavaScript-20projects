// DOM ELEMENTS
// all #id

const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionaireBtn = document.getElementById('show-millionaire');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

let data = [];

getRandomUser();
getRandomUser();
getRandomUser();

// FETCH random user and add money
async function getRandomUser() {
  // fetch('https://randomuser.me/api')
  // .then(res => res.json())
  // .then(data)
  const res = await fetch('https://randomuser.me/api');
  const data = await res.json();
  // console.log(data);

  const user = data.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 100000),
  };
  //   console.log(newUser)
  addData(newUser);
}

// ADD NEW OBJ TO DATA ARR
function addData(obj) {
  data.push(obj);

  updateDOM();
}

// UPDATE DOM - has a default data when nothing is passed in the function
function updateDOM(provideData = data) {
  // Clear main div
  main.innerHTML = '<h2><strong>Person</strong>Wealth</h2>';

  //   FOR EACH adding the user
  provideData.forEach((item) => {
    const element = document.createElement('div');
    element.classList.add('person');
    element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(
      item.money
    )}`;
    main.appendChild(element);
  });
}

// FORMAT NUMBER AS MONEY - https:stackoverflow.com/questions/149055/how-to-format-number-as-currency-string
function formatMoney(number) {
  return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  // input function in the forEach item.money
}

//  MAP double everyone's money
function doubleMoney() {
  data = data.map((user) => {
    return { ...user, money: user.money * 2 };
  });

  updateDOM();
}

// SORT users by richest
function sortByRiches() {
  data.sort((a, b) => b.money - a.money);
  // b - a because we want the richest person first

  updateDOM();
}

// FILTER only millionaires
function showMillionaires() {
  data = data.filter((user) => user.money > 100000);

  updateDOM();
}

// REDUCE wealth
function calculateWealth() {
  const wealth = data.reduce((acc, user) => (acc += user.money), 0);

  // console.log(formatMoney(wealth));
  const wealthElement = document.createElement('div');
  wealthElement.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(
    wealth
  )}</strong></h3>`;
  main.appendChild(wealthElement);
}

// EVENT LISTENERS
addUserBtn.addEventListener('click', getRandomUser);
// from fetch
doubleBtn.addEventListener('click', doubleMoney);
// using map
sortBtn.addEventListener('click', sortByRiches);
// using sort
showMillionaireBtn.addEventListener('click', showMillionaires);
// using filter
calculateWealthBtn.addEventListener('click', calculateWealth);
// using reduce (adding everything together)
