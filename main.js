const searchInput = document.querySelector('.pokemon-name');
const searchBtn = document.querySelector('.search-btn');
const pokemonInfo = document.querySelector('.pokemon-info');
async function getData(url){
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err)
  }
}
searchBtn.addEventListener('click',async ()=>{searchPokemon()});
searchInput.addEventListener('keyup',async (e)=>{
  if(e.key === "Enter"){
    searchPokemon();
  }
})

async function searchPokemon(){
  let data = await getData('https://pokeapi.co/api/v2/pokemon?limit=1351');
  let pokemons = data.results;
  let html = '';
  let pokemonName = searchInput.value;
  pokemons.forEach(async (pokemon)=>{
    if(pokemonName === pokemon.name){
      let pokemonInfos = await getData(pokemon.url);
      html += 
      `
      <img src="${pokemonInfos.sprites.front_default}" 
      alt="pokemon image" 
      class="pokemon-img"
      draggable="false"
      >
      <div class="info">
        <h1 class="info-pokemon-name">${pokemon.name}</h1> 
        <p>Abilities:${pokemonInfos.abilities.map((ability)=> ability.ability.name)}</p>
        <p>Base Xp:${pokemonInfos.base_experience}</p>
        <p>Id:${pokemonInfos.id}</p>  
        <p>order:${pokemonInfos.order}</p>  
        <p>Height:${pokemonInfos.height}</p>  
      </div>
      `
      pokemonInfo.innerHTML = html;
    }
  });
}
