const form = document.querySelector('form');
const input = document.querySelector('input');

const pokeSprite = document.querySelector('.pokemon__img');
const pokeName = document.querySelector('.pokemon__name');
const pokeId = document.querySelector('.pokemon__id');

const btnPrev = document.querySelector('.prev');
const btnNext = document.querySelector('.next');

const userEvents = ['click', 'touchstart'];

const fetchApi = async (pokemon) => {
  const api = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
  const res = await fetch(api);

  // if status === ok
  if (res.status === 200) {
    const data = await res.json();
    return data;
  }
};

const updateDisplay = async (pokemon) => {
  pokeId.innerText = '';
  pokeName.innerText = 'Loading...';

  const data = await fetchApi(pokemon);

  if (data) {
    pokeName.innerText = data.name;
    pokeId.innerText = data.id;
    pokeSprite.style.display = 'initial';
    pokeSprite.src = data['sprites']['versions']['generation-v']['black-white']['animated'].front_default;

    input.value = '';
  } else {
    pokeSprite.style.display = 'none';
    pokeName.innerText = 'Not found';
    pokeId.innerText = '';
  }
};

const prevPokemon = (e) => {
  if (e.type === 'touchstart') e.preventDefault();
  let curId = pokeId.innerText;
  const idToFetch = --curId;

  // if idToFetch === 0 nothing will happen, since there's no pokemon
  // with an id of 0 or below
  if (idToFetch) updateDisplay(idToFetch);
};

const nextPokemon = (e) => {
  if (e.type === 'touchstart') e.preventDefault();
  let curId = pokeId.innerText;
  const idToFetch = ++curId;
  updateDisplay(idToFetch);
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  updateDisplay(input.value.toLowerCase());
});

// userEvents = ['click', 'touchstart']
userEvents.forEach((userEvent) => {
  btnPrev.addEventListener(userEvent, prevPokemon);
  btnNext.addEventListener(userEvent, nextPokemon);
});
