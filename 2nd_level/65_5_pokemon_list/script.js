// Step One
const xhr = new XMLHttpRequest();

xhr.open("GET", "https://api.vschool.io/pokemon", true)

xhr.send()

xhr.onreadystatechange = () => {
    if(xhr.readyState === 4 && xhr.status === 200) {
        const arr = JSON.parse(xhr.responseText).objects[0].pokemon
        addPokemonDivs(arr);
    }
}

function addPokemonDivs(arr) {
    arr.forEach(pokemon => {
        const div = document.createElement('div');
        div.textContent = pokemon.name
        document.body.appendChild(div)
    })
}