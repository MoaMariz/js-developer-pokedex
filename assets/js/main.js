const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const loadStatsButton = document.getElementsByClassName('loadStatsButton')

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
            <div class="btn-stats">
                <button class="loadStatsButton" type="button" pokemon-id="${pokemon.number}">
                See More
                </button>
            </div>
        </li>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon, index) => convertPokemonToLi(pokemon, index)).join('')
        pokemonList.innerHTML += newHtml

        document.querySelectorAll('.loadStatsButton').forEach((button, index) => {
            const pokemonId = index + 1;
            button.setAttribute('pokemon-id', pokemonId);
            button.addEventListener('click', function() {
                const pokemonId = this.getAttribute('pokemon-id');
                window.location.href = `stats.html?id=${pokemonId}`;
            });
        });
    });
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})