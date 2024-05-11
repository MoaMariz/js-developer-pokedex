document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const pokemonId = urlParams.get('id');
    loadPokemonStats(pokemonId);
});

function loadPokemonStats(pokemonId) {
    pokeApi.getPokemonDetail({url: `https://pokeapi.co/api/v2/pokemon/${pokemonId}/`})
        .then(pokemon => {
            const pokemonStatsHtml = `
            <div class="${pokemon.type}-b container">
                <div class="row icons">
                    <i class="fa-solid fa-arrow-left" id="backButton"></i>
                    <i class="fa-regular fa-heart" id="heart"></i>
                </div>
                <div class="row">
                    <div class="poke-name">
                        <h1>${pokemon.name}</h1>
                        <ol class="types">
                            ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                        </ol>
                    </div>
                    <div class="poke-number">
                        <h3>#${pokemon.number}</h3>
                    </div>
                </div>

                <div class="img-container">
                <img class="poke-img" src="${pokemon.photo}" alt="${pokemon.name}">
                </div>

                <div class="card">
                    <div class="about">
                        <h2>About</h2>
                        <h3>Height: <span>${pokemon.height} cm</span></h3>
                        <h3>Weight: <span>${pokemon.weight} kg</span></h3>
                        <ol class="abilities">
                        <h3>Abilities</h3>
                            ${pokemon.abilities.map((ability) => `<li class="ability">${ability}</li>`).join('')}
                        </ol>
                    </div>
                    <div class="stats">
                        <h2>Base Stats</h2>
                        <ul>
                            ${Object.entries(pokemon.baseStats).map(([statName, statValue]) => `
                                <li class="list_stats"><span class="stat_name">${statName}</span>: <span class="stat_value">${statValue}</span></li>
                            `).join('')}
                        </ul>
                    </div>
                </div>
            </div>
            `;

            const pokemonStatsContainer = document.getElementById("pokemonStats");
            pokemonStatsContainer.innerHTML = pokemonStatsHtml;

            const backButton = document.getElementById("backButton");
            backButton.addEventListener("click", function() {
                window.location.href = "index.html";
            });
        });
}