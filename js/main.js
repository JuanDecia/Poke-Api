// DOM
const getNumber = document.querySelector('#pokeNumber');
const contRender = document.querySelector('.cont-render');
const searchBtn = document.querySelector('.buscaPokemon');


// Consume Poke Api.
const fetchData = async (pokeNumber) => {
    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeNumber}`);
        const data = await res.json();
        renderCardPokemon(data);
    } catch (error) {
        console.log(error);
    }
};


// Busca Pokemon.
const buscarPokemon = () => {
    const pokemonId = getNumber.value;

    if (pokemonId.trim() === "") {
        alert("Por favor ingresa un número de Pokémon");
        return; // Detiene la ejecución si el campo está vacío
    }

    fetchData(pokemonId);
};

const renderCardPokemon = (pokemon) => {
    const {
        name: pokemonName,
        sprites: {front_default: imageUrl },
        types,
        weight,
        height,
    } = pokemon;

    contRender.innerHTML = `
    <div class="pokemon-card">
        <div class="pokemon-img">
            <img class='pokemon' src='${imageUrl}' alt=${pokemonName} />
        </div>
        <div class="pokemon-info">
            <div class="pokemon-name">
                <h2>${pokemonName}</h2>
            </div>
            <div class="pokemon-type">
                ${types.map(type => type.type.name).join(', ')}
            </div>
            <div class="pokemon-stats">
                <span class="pokemon-heigth">Altura: ${(height / 10).toFixed(1)} m</span>
                <span class="pokemon-weigth">Peso: ${(weight / 10).toFixed(1)} kg</span>
            </div>
        </div>
    </div>
    `
}

// Función Inicializadora.
const init = () => {
    searchBtn.addEventListener('click', buscarPokemon);
}
init();