const pokemonName = document.querySelector('.pokemom__name');
const pokemonNumber = document.querySelector('.pokemom__number');
const pokemonImg = document.querySelector('.pokemom__image');

const form = document.querySelector('.form');
const input = document.querySelector('.input__search');

const btnPrev = document.querySelector('.btn-prev');
const btnNext = document.querySelector('.btn-next');

let seacherPokemon = 1;
const fetchpokemon = async (pokemon) =>{

    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if(APIResponse.status == 200){
        const data = await APIResponse.json();
        return data;
    }
}

const renderPokemon = async (pokemon) =>{

    pokemonName.innerHTML = 'Carregando ...';
    pokemonNumber.innerHTML = '';

    const data = await fetchpokemon(pokemon);
    if(data){
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        seacherPokemon = data.id;
        pokemonImg.style.display = 'block';
        pokemonImg.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        input.value ='';
    } else {
        pokemonName.innerHTML = 'Not found';
        pokemonNumber.innerHTML = '';
        pokemonImg.style.display = 'none';
    }
}

form.addEventListener('submit', (event) =>{
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
})

btnPrev.addEventListener('click', () =>{
    if(seacherPokemon > 1){
        seacherPokemon -= 1;
        renderPokemon(seacherPokemon);
    }
})

btnNext.addEventListener('click', () =>{
    seacherPokemon += 1;
    renderPokemon(seacherPokemon);
})

renderPokemon(seacherPokemon);
