//  Obtener detalles de un Pokémon por nombre
async function obtenerDetallesPokemon(nombre) {
  try {
    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${nombre.toLowerCase()}`
    );
    if (!res.ok) throw new Error("Pokémon no encontrado");

    const data = await res.json();
    console.log(`1a. Detalles de ${nombre}:`, data);
    return data;
  } catch (error) {
    console.error("Error en 1a:", error.message);
  }
}

// Obtener habilidades de un Pokémon específico
async function obtenerHabilidadesPokemon(nombre) {
  try {
    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${nombre.toLowerCase()}`
    );
    if (!res.ok) throw new Error("Pokémon no encontrado");

    const data = await res.json();
    // Extraemos solo los nombres de las habilidades del arreglo
    const habilidades = data.abilities.map((item) => item.ability.name);
    console.log(`1b. Habilidades de ${nombre}:`, habilidades);
    return habilidades;
  } catch (error) {
    console.error("Error en 1b:", error.message);
  }
}

//  Obtener una lista de los primeros 50 Pokémon
async function obtenerPrimeros50() {
  try {
    const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=50");
    if (!res.ok) throw new Error("No se pudo obtener la lista");

    const data = await res.json();
    console.log("1c. Primeros 50 Pokémon:", data.results);
    return data.results;
  } catch (error) {
    console.error("Error en 1c:", error.message);
  }
}

// funciones de prueba para ver la consola
obtenerDetallesPokemon("pikachu");
obtenerHabilidadesPokemon("charmander");
obtenerPrimeros50();

// ===========================================
// Interfaz para buscar y mostrar un Pokémon
// ===========================================

document.getElementById("searchBtn").addEventListener("click", async () => {
  const nombre = document
    .getElementById("pokemonName")
    .value.trim()
    .toLowerCase();
  const card = document.getElementById("pokemonCard");

  if (!nombre) {
    return alert("Por favor, ingresa el nombre de un Pokémon");
  }

  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`);
    if (!res.ok) throw new Error("Pokémon no encontrado");

    const data = await res.json();

    // Formateamos habilidades y tipos como texto separado por comas
    const habilidades = data.abilities
      .map((item) => item.ability.name)
      .join(", ");
    const tipos = data.types.map((item) => item.type.name).join(", ");

    card.innerHTML = `
      <h2>${data.name.toUpperCase()}</h2>
      <img src="${data.sprites.front_default}" alt="${data.name}" />
      <p><strong>ID:</strong> #${data.id}</p>
      <p><strong>Tipo:</strong> ${tipos}</p>
      <p><strong>Habilidades:</strong> ${habilidades}</p>
    `;
    card.style.display = "block";
  } catch (error) {
    card.innerHTML = `<p style="color: red;">No se encontró el Pokémon "${nombre}"</p>`;
    card.style.display = "block";
    console.error(error.message);
  }
});