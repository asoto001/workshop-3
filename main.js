import { getData } from "./helper/getData.js";

const containerCards = document.querySelector(".main-container");
const containerButtons = document.querySelector('.buttons-container');


const URL_API = "https://pokeapi.co/api/v2/pokemon";

const listPokemons = [];
let botones = [];

const getPokemons = async (url) => {
  const response = await axios.get(url);
  console.log(response.data.results);
  response.data.results.forEach(async (pokemom, index) => {
    const dataPokemon = await axios.get(pokemom.url);
    const newPokemon = {
      name: pokemom.name,
      image: dataPokemon.data.sprites.front_default,
      weight: dataPokemon.data.weight,
      height: dataPokemon.data.height,
      experience: dataPokemon.data.base_experience,
      abilities: dataPokemon.data.abilities,
      types: dataPokemon.data.types,
      id : dataPokemon.data.id
    };
    listPokemons.push(newPokemon);
    if (index + 1 === response.data.results.length) {
      console.log(listPokemons);
      renderPokemons(listPokemons);
      renderBtns(listPokemons);
    }
  });

};

getPokemons(URL_API);

const renderPokemons = (arrayPokemons) => {
  containerCards.innerHTML = "";
  let num = 0;
  num = aleatorio(0, arrayPokemons.length)
  let ind = 0;
  arrayPokemons.forEach((pokemom) => {
    if (ind == num){
      containerCards.innerHTML += `
    <section class="charizard-container">
            <div class="title">
                <figure>
                    <img src="https://static.vecteezy.com/system/resources/previews/001/188/706/original/flame-png.png" alt="llama">
                </figure>
                <h2>${pokemom.name}</h2>
            </div>
            <figure class="image-charizard">
                <img src="${pokemom.image}" alt="chaizard">
            </figure>
        </section>
        <article class="info-pokemon">
            <div class="row-info">
                <div class="row-item">
                    <span class="title-info">No.</span>
                    <span class="info-text">${pokemom.id}</span>
                    
                </div>
                <div class="row-item">
                    <span class="title-info">LEVEL</span>
                    <span class="info-text">${pokemom.experience}</span>
                </div>
            </div>
            <div class="row-info">
                <div class="row-item">
                    <span class="title-info">TYPE</span>
                    ${renderType(pokemom.types)}
                </div>
                <div class="row-item">
                    <span class="title-info">HABILITY</span>
                    <span class="info-text">${renderAbilities(pokemom.abilities)}</span>
                </div>
            </div>
            <div class="row-info">
                <div class="row-item">
                    <span class="title-info">HEIGHT</span>
                    <span class="info-text">${pokemom.height}</span>
                </div>
                <div class="row-item">
                    <span class="title-info">WEIGHT</span>
                    <span class="info-text">${pokemom.weight}</span>
                </div>
            </div>
        </article>    
    
    
        `;
        
    }
    ind = ind + 1;
  });
};

const renderBtns = (arrayPokemons) => {
  containerButtons.innerHTML = '';
  arrayPokemons.forEach((pokemom) => {
    containerButtons.innerHTML += `
      <button id= "${pokemom.id}" class="buttons-container__btn">
        <figure>
            <img src="${pokemom.image}" alt="pokemon">
        </figure>
      </button>
      
    `
  })
  botones = document.querySelectorAll('.buttons-container__btn')
  selecPoke()
}

const selecPoke = () => {
  botones.forEach((boton) => {
    boton.addEventListener('click', (e) => {
      console.log(e)
    })
  })
}


const renderAbilities = (arrayAbilities) => {
  let abilitiesList = "";
  arrayAbilities.forEach((ability) => {
    abilitiesList += `
        <span class="card__abilities">${ability.ability.name}</span>
        `;
  });
  return abilitiesList;
};

const renderType = (arrayTypes) => {
  let typeList = "";
  arrayTypes.forEach((types) => {
    typeList += `
      
      <span class="info-text">${types.type.name}</span>
    `
  });
  return typeList
}

const renderPokemon = (pokemom) => {
  containerCards.innerHTML = `
    <section class="charizard-container">
      <div class="title">
          <figure>
              <img src="https://static.vecteezy.com/system/resources/previews/001/188/706/original/flame-png.png" alt="llama">
          </figure>
          <h2>${pokemom.name}</h2>
      </div>
      <figure class="image-charizard">
          <img src="${pokemom.image}" alt="${pokemom.name}">
      </figure>
    </section>
    <article class="info-pokemon">
      <div class="row-info">
          <div class="row-item">
              <span class="title-info">No.</span>
              ${renderType(pokemom.type)}
          </div>
          <div class="row-item">
              <span class="title-info">LEVEL</span>
              <span class="info-text">${pokemom.experience}   </span>
          </div>
      </div>
      <div class="row-info">
          <div class="row-item">
              <span class="title-info">TYPE</span>
              <span class="info-text">FIRE</span>
          </div>
          <div class="row-item">
              <span class="title-info">HABILITY</span>
              <span class="info-text">${renderAbilities(pokemom.abilities)}</span>
          </div>
      </div>
      <div class="row-info">
          <div class="row-item">
              <span class="title-info">HEIGHT</span>
              <span class="info-text">${pokemom.height}</span>
          </div>
          <div class="row-item">
              <span class="title-info">WEIGHT</span>
              <span class="info-text">${pokemom.weight}</span>
          </div>
      </div>
    </article>    

  `
}

//-----------Funcionalidades para la búqueda de pokemons por nombre------

//Cuando empleamos el método document.querySelector() y vamos a capurar el elemento por: 1. id: (#nombreID) 2. class: (.nombreClase) 3. elemento o etiqueta: (nombreDeLaEtiqueta).

const search = document.querySelector(".form__search");

search.addEventListener("submit", async (event) => {
  event.preventDefault();
  const inputSearch = document.querySelector("#inputSearch");
  //Los valores que JavaScript reconoce como false son: undefined, null, 0, '' (strig vacío), NaN.
  const searchTerm = inputSearch.value;
  if (searchTerm) {
    console.log(searchTerm);
    console.log(typeof searchTerm);

    const searchURL = `${URL_API}/${searchTerm}`;
    const pokemon = await getData(searchURL);
    console.log(pokemon);
      if (pokemon) {
        renderPokemon(pokemon);
    }
  }
});


// funciones de num

function aleatorio(min, max){
  return Math.floor(Math.random() * (max - min + 1) + min)
}