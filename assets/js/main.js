
const url = `https://pokeapi.co/api/v2/pokemon?offset=0&limit=150`;
const content = document.querySelector(".content");
const olElement = document.querySelector(".pokemons");

const infos = fetch(url)
    .then((response) => response.json())
    .then(responseBody => responseBody.results)
    .then(pokemon => {
        pokemon.forEach(info => {
            const name = info.name;
            const pokemon = {
                name: name,
                infos: infos
            };

            const liElement = document.createElement("li");
            liElement.className = "pokemon";

            const preInfoDiv = document.createElement("div");
            preInfoDiv.className = "pre-info";

            const nameElement = document.createElement("p");
            nameElement.className = "name";
            nameElement.textContent = `${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1).toLowerCase()}`;

            const idElement = document.createElement("p");
            idElement.className = "id";

            preInfoDiv.appendChild(nameElement);
            preInfoDiv.appendChild(idElement);

            const infosDiv = document.createElement("div");
            infosDiv.className = "infos";

            const typesList = document.createElement("ol");
            typesList.className = "types";

            const abilitiesList = document.createElement("ol");
            abilitiesList.className = "abilities";

            const abilitiesText = document.createElement("p");
            abilitiesText.className = "abilities-text";
            abilitiesText.textContent = "Abilities:";

            const bodyInfosDiv = document.createElement("div");
            bodyInfosDiv.className = "body-infos";

            const heightElement = document.createElement("p");
            heightElement.className = "height";

            const weightElement = document.createElement("p");
            weightElement.className = "weight";

            bodyInfosDiv.appendChild(heightElement);
            bodyInfosDiv.appendChild(weightElement);

            const imgElement = document.createElement("img");
            imgElement.alt = "";

            abilitiesList.appendChild(abilitiesText);
            infosDiv.appendChild(typesList);
            infosDiv.appendChild(abilitiesList);
            infosDiv.appendChild(bodyInfosDiv);
            liElement.appendChild(preInfoDiv);
            liElement.appendChild(infosDiv);
            liElement.appendChild(imgElement);
            olElement.appendChild(liElement);

            const url = info.url;
            fetch(url)
                .then((response) => response.json())
                .then(responseBody => {
                    const infos = {
                        abilities: responseBody.abilities.map(ability => ability.ability.name),
                        types: responseBody.types.map(type => type.type.name),
                        height: responseBody.height,
                        weight: responseBody.weight,
                        img: responseBody.sprites.other.dream_world.front_default,
                        index: responseBody.game_indices[3].game_index
                    };
                    idElement.textContent = `#${infos.index.toString().padStart(4, "0")}`;
                    infos.types.forEach(type => {
                        const Type = document.createElement("li");
                        Type.className = "type";
                        Type.textContent = type;
                        typesList.appendChild(Type);
                    });

                    infos.abilities.forEach(ability => {
                        const abilityPoke = document.createElement("li");
                        abilityPoke.className = "ability";
                        abilityPoke.textContent = (ability.charAt(0).toUpperCase() + ability.slice(1).toLowerCase()).replaceAll("-", " ");
                        abilitiesList.appendChild(abilityPoke);
                    });
                    heightElement.textContent = `${infos.height * 10} cm`;
                    weightElement.textContent = `${infos.weight / 10} kg`;
                    imgElement.src = infos.img;

                    let type = infos.types[0];
                    if (type === "normal") {
                        liElement.style.backgroundColor = "#F0F0F0";
                    } else if (type === "fire") {
                        liElement.style.backgroundColor = "#FF0000";
                    } else if (type === "water") {
                        liElement.style.backgroundColor = "#0000FF";
                    } else if (type === "grass") {
                        liElement.style.backgroundColor = "#00FF00";
                    } else if (type === "electric") {
                        liElement.style.backgroundColor = "#FFFF00";
                    } else if (type === "ice") {
                        liElement.style.backgroundColor = "#FFFFFF";
                    } else if (type === "fighting") {
                        liElement.style.backgroundColor = "#FF00FF";
                    } else if (type === "poison") {
                        liElement.style.backgroundColor = "#00FFFF";
                    } else if (type === "ground") {
                        liElement.style.backgroundColor = "#A0522D";
                    } else if (type === "flying") {
                        liElement.style.backgroundColor = "#0000A0";
                    } else if (type === "bug") {
                        liElement.style.backgroundColor = "#A0A020";
                    } else if (type === "psychic") {
                        liElement.style.backgroundColor = "#8080FF";
                    } else if (type === "rock") {
                        liElement.style.backgroundColor = "#A02020";
                    } else if (type === "ghost") {
                        liElement.style.backgroundColor = "#FFFFFF";
                    } else if (type === "dragon") {
                        liElement.style.backgroundColor = "#FFFF00";
                    } else if (type === "dark") {
                        liElement.style.backgroundColor = "#FF00A0";
                    } else if (type === "steel") {
                        liElement.style.backgroundColor = "#A0A0A0";
                    } else if (type === "fairy") {
                        liElement.style.backgroundColor = "#FF00FF";
                    }
                });

        });
    })
    .catch((error) => {
        console.log(error);
    })
    .finally(() => {
        console.log(`requisicao concluida`);
    });
