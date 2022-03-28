console.log("I have loaded");



const container = document.querySelector("#container");
const fetchPokemon = async () => {
  for(let id = 387; id <= 487; id++){
    const info =  await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
    const res = await info.json();
    console.log(res.name);
    // console.log(res.stats[0].stat.name);
    console.log(res);

    //Fetching 4 moves:
    const move_array = [];
    let count = 0;
    for(let i = res.moves.length-1; i >= 0; i--){
      if(res.moves[i].version_group_details[0].move_learn_method.name != "tutor"){
        if(res.moves[i].move.name == "confide") continue;
        count++;
        move_array.push(res.moves[i].move.name);
      }
      if(count == 4) break;
    }

    // console.log(move_array);
    //-------------------------------------------------
    const pokemon = {
      name: res.name,
      id: res.id,
      img: res.sprites.front_default,
      types: res.types.map((data) => {return data.type.name}).join(', '),
      stats: res.stats.map((data) => {
        let s = "";
        s += data.stat.name;
        s += ": ";
        s += data.base_stat;
        return s;
      }),
      moves: move_array,
      basictype: res.types[0].type.name,
      abilities: res.abilities.map((data) => {
        return data.ability.name;
      }).join(', ')
    };
    displayPokemon(pokemon);
    console.log(pokemon);
  }
}

fetchPokemon();
//Make it responsive later:

const displayPokemon = (pokemon) => {
  const pokemon_row = document.createElement("div");
  pokemon_row.classList.add("row");
  pokemon_row.classList.add("pokemon_tab");
  pokemon_row.classList.add(pokemon.basictype);

  //Create 3 columns and give it a class of col
  const pokemon_info = document.createElement("div");
  pokemon_info.classList.add("col-lg-4");
  pokemon_info.classList.add("moves_style");
  pokemon_info.innerHTML = `<div> <img src = "${pokemon.img}"> </div>
    <div> #${pokemon.id}: ${pokemon.name} </div>
    <p> type: ${pokemon.types} </p>
    <p> ability: ${pokemon.abilities} </p>
  `;

  let hp, atk, spatk, spdef, speed, def;
  hp = pokemon.stats[0], atk = pokemon.stats[1], def = pokemon.stats[2];
  spatk = pokemon.stats[3], spdef = pokemon.stats[4], speed = pokemon.stats[5];

  const pokemon_stats = document.createElement("div");
  pokemon_stats.classList.add("col-lg-4");
  pokemon_stats.classList.add("moves_style");
  pokemon_stats.innerHTML = `
    <div style="font-size: 20px;
    font-weight: bolder;
    text-decoration: underline;"> Base Stats</div>
    <div class="stats_info">
      <div>${hp} </div>
      <div>${atk} </div>
      <div>${def} </div>
      <div>${spatk} </div>
      <div>${spdef} </div>
      <div>${speed} </div>
    </div>
  `;

  //Pokemon moves:
  const pokemon_moves = document.createElement("div");
  pokemon_moves.classList.add("col-lg-4");
  pokemon_moves.classList.add("moves_style");

  const move_text = document.createElement("p");
  move_text.classList.add("move_text");
  move_text.innerHTML = "Moves";
  pokemon_moves.appendChild(move_text);

  const moves_container = document.createElement("div");
  for(let i=0; i<pokemon.moves.length; i++){
    const move_div = document.createElement("div");
    // moves_container.appendChild(pokemon.moves[i]);
    move_div.innerText = pokemon.moves[i];
    moves_container.appendChild(move_div);
  }

  pokemon_moves.appendChild(moves_container);

  pokemon_row.appendChild(pokemon_info);
  pokemon_row.appendChild(pokemon_stats);
  pokemon_row.appendChild(pokemon_moves);

  container.appendChild(pokemon_row);
}
