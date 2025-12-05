const input = document.getElementById("idInput");
const button = document.querySelector(".buttonSearch");
const container = document.querySelector(".import-container");

button.addEventListener("click", async () => {
    const name = input.value.trim();

    if (name === "") {
        alert("Ingrese un nombre del personaje");
        return;
    }

    try {
        const res = await fetch(`https://rickandmortyapi.com/api/character/?name=${name}`);
        const data = await res.json();
        mostrarPersonajes(data.results);
    } catch (error) {
        container.innerHTML = "<p>No se encontraron personajes.</p>";
    }
});

function mostrarPersonajes(lista) {
    container.innerHTML = "";

    lista.forEach(p => {
        const card = `
            <div class="char-container">
                <div class="char-container_img">
                    <img src="${p.image}" alt="${p.name}">
                </div>
                <div class="char-container_text">
                    <h3>Nombre: ${p.name}</h3>
                    <p>Estado: ${p.status}</p>
                </div>
            </div>
        `;
        container.innerHTML += card;
    });
}