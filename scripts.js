const select = document.querySelector("select");
const section = document.querySelector("section");
const input = document.querySelector("input");
let finalData = [];

// async-> breaking the normal flow of a program.
// promises-> a object which tells the state of async program/execution. Types->all,any,allsettled,race
async function fetchData() {
    const response = await fetch("https://pokeapi.co/api/v2/type/?limit=21");
    // json and stringyfy
    const data = await response.json();
    console.log(data.results);
    showTypes(data.results);
}

function showTypes(data) {
    data.map((obj) => {
        const option = document.createElement("option");
        option.value = obj.name;
        option.innerText = obj.name;
        select.append(option);
    });
}

async function fetchPokemons() {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20&offset=0");
    const result = await response.json();
    const results = result.results;
    
    const promises = results.map(async (obj) => {
        const response = await fetch(obj.url);
        const result = await response.json();
        return result;
    });
    console.log(promises);
    finalData = await Promise.all(promises);
    showPokemon(finalData);
}
function showPokemon(result) {
    // console.log(result);
    section.innerHTML="";
    result.map((obj) => {
        const div = document.createElement("div");
        div.classList.add("parent");
        const img = document.createElement("img");
        const name = document.createElement("h3");
        img.src = obj.sprites.other.dream_world.front_default;
        name.innerText = obj.name;

        div.append(img, name);
        section.append(div);
    });
}

function selectPokemon(input) {
    const selectedType = input.target.value;
    if (selectedType=="all"){
        return showPokemon(finalData);
    }
    const selectedPokemon = finalData.filter((dheeraj) => {
        // return (dheeraj.filter((pokemon) => {
                return dheeraj.types.some((type) => {
                    return type.type.name === selectedType
                })
        // }))
    });
    showPokemon(selectedPokemon)
    console.log(selectedPokemon);
}
select.addEventListener("change", selectPokemon);
fetchData();

fetchPokemons();