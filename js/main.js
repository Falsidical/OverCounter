const botonMenos1 = document.querySelector('#botonMenos1');
const contador1 = document.querySelector('#contador1');
const botonMas1 = document.querySelector('#botonMas1');

const botonMenos2 = document.querySelector('#botonMenos2');
const contador2 = document.querySelector('#contador2');
const botonMas2 = document.querySelector('#botonMas2');

const botonMenos3 = document.querySelector('#botonMenos3');
const contador3 = document.querySelector('#contador3');
const botonMas3 = document.querySelector('#botonMas3');

const reset = document.querySelector('#reset');

const themeSelector = document.querySelector('#theme');
const root = document.querySelector(':root');

const themeColors = {
  dark: ['#E22A7F', '#ff3d98'],
  green: ['#16ff35e8', '#16ff35'],
  sombra: ['#d30ce6e8', '#f25effe8'],
  mercy: ['#f7e546e8', '#f8ea70'],
  dva: ['#E22A7F', '#ff3d98'],
  hanzo: ['#0c72e6e8', '#4ea0ffe8'],
};

let counter = {
  tankWins: 0,
  damageWins: 0,
  supportWins: 0,
};

botonMenos1.addEventListener('click', () => {
  updateCounter('tankWins', false);
});

botonMas1.addEventListener('click', () => {
  updateCounter('tankWins', true);
});

botonMenos2.addEventListener('click', () => {
  updateCounter('damageWins', false);
});

botonMas2.addEventListener('click', () => {
  updateCounter('damageWins', true);
});

botonMenos3.addEventListener('click', () => {
  updateCounter('supportWins', false);
});

botonMas3.addEventListener('click', () => {
  updateCounter('supportWins', true);
});

function updateCounter(role, gameWon) {
  if (gameWon && counter[role] < 10) counter[role]++;
  if (!gameWon && counter[role] > 0) counter[role]--;
  updateText();
  saveInLocalStorage();
}

function updateText() {
  contador1.textContent = counter.tankWins;
  contador2.textContent = counter.damageWins;
  contador3.textContent = counter.supportWins;
}

function saveInLocalStorage() {
  localStorage.setItem('overtracker', JSON.stringify(counter));
}

function loadFromLocalStorage() {
  let saved = JSON.parse(localStorage.getItem('overtracker'));
  if (saved) counter = saved;
  updateText();
}

reset.addEventListener('click', () => {
  counter.tankWins = 0;
  counter.damageWins = 0;
  counter.supportWins = 0;
  updateText();
  saveInLocalStorage();
});

themeSelector.addEventListener('change', () => {
  switch (themeSelector.value) {
    case 'dark':
      document.querySelector('body').style.backgroundImage = '';
      break;
    case 'sombra':
      document.querySelector('body').style.backgroundImage = 'url(img/sombra.jpeg)';
      break;
    case 'mercy':
      document.querySelector('body').style.backgroundImage = 'url(img/mercy.jpg)';
      break;
    case 'dva':
      document.querySelector('body').style.backgroundImage = 'url(img/dva.jpg)';
      break;
    case 'hanzo':
      document.querySelector('body').style.backgroundImage = 'url(img/hanzo.jpg)';
      break;
  }
  setColors(themeColors[themeSelector.value]);
  saveThemeInLocalStorage(themeSelector.value);
});

function saveThemeInLocalStorage(theme) {
  localStorage.setItem('theme', theme);
}

function loadThemeFromLocalStorage() {
  let theme = localStorage.getItem('theme');
  if (theme) {
    document.querySelector('body').style.backgroundImage = `url(img/${theme}.jpg)`;
    setColors(themeColors[theme]);
  }
  updateText();
}

function setColors(color) {
  root.style.setProperty('--main-color', color[0]);
  root.style.setProperty('--secondary-color', color[1]);
}

loadFromLocalStorage();
loadThemeFromLocalStorage();
