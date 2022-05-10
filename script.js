const searchButtons = document.querySelectorAll(".search");
const cardsWrapper = document.querySelector(".cards-wrapper");

async function wait(ms) {
    await setTimeout(ms);
    return;
}
function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
    return array;
}
function handleError(err) {
    console.log("ERRRRRRRRROOOR");
    console.log(err);
    console.log("-----------------SEPARADOR-----------------");
}
async function mtgDataFetch(endpoint) {
    wait(100);
    const response = await fetch(endpoint).catch(handleError);
    const data = await response.json();
    return data;
}

function makeCard(cardObject) {
    const card = document.createElement("div");
    card.innerHTML = `
    <div class="card">
        <img class="cardArt" src="${cardObject.image_uris.art_crop}" alt="">
        <h1 class="cardName">"${cardObject.name}"</h1>
        <h2 class="cardArtist">${cardObject.artist} - ${cardObject.frame} </h2>
        <div class="cardDivider"></div>
    </div>
    `;
    cardsWrapper.insertAdjacentElement("beforeend",card);
    return card;
}

async function loadMore(endpoint,showMoreButton) {
    showMoreButton.style.display !== "none" ? showMoreButton.style.display = "none" : null;
    if (endpoint !== "undefined") {
    const listObject = await mtgDataFetch(endpoint);
    const cardsArray = listObject.data;
    cardsArray.forEach( (card) => { card.image_uris !== undefined && card.legalities.pauper === "legal" ? makeCard(card) : null });
    const nextPageEndpoint = listObject.next_page;
    showMore(nextPageEndpoint);
    } else return
}

function showMore(endpoint) {
    const showMoreButton = document.createElement("button");
    showMoreButton.textContent = "Load More";
    showMoreButton.className = "loadMoreButton";
    cardsWrapper.insertAdjacentElement("afterend", showMoreButton);
    showMoreButton.addEventListener('click', () => loadMore(endpoint,showMoreButton));
}

async function searchButtonHandler(e) {
    cardsWrapper.innerHTML = "";
    const query = e.target.value;
    const endpoint = `https://api.scryfall.com/cards/search?q=cube:modern&q=f:pauper&q=t:${query}&order=released`;
    const listObject = await mtgDataFetch(endpoint);
    const cardsArray = listObject.data;
    shuffle(cardsArray);
    cardsArray.forEach( (card) => { card.image_uris !== undefined && card.legalities.pauper === "legal" ? makeCard(card) : null });
    const nextPageEndpoint = listObject.next_page;
    showMore(nextPageEndpoint);
    showMoreButton.style.display !== "none" ? showMoreButton.style.display = "none" : null;
};


searchButtons.forEach( (button) => button.addEventListener('click',searchButtonHandler) );


