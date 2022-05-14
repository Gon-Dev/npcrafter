const typeSearchButtons = document.querySelectorAll(".search");
const cardsWrapper = document.querySelector(".cards-wrapper");
const loadMoreButton = document.querySelector(".load-more");
const buttonScrollUp = document.querySelector(".scroll-to-top");
".scroll-to-top-button"

function handleError(err) {
    console.log("ERRRRRRRRROOOR");
    console.log(err);
    console.log("-----------------SEPARADOR-----------------");
}

async function dataFetch(endpoint) {
    setTimeout(100);
    const response = await fetch(endpoint).catch(handleError);
    const data = await response.json();
    return data;
}

function displayCard(cardData) {
    const card = document.createElement("div");
    card.innerHTML = `
    <div class="card">
        <img class="cardArt" src="${cardData.image_uris.art_crop}" alt="">
        <h1 class="cardName">"${cardData.name}"</h1>
        <h2 class="cardArtist">${cardData.artist} - ${cardData.frame} </h2>
        <div class="cardDivider"></div>
    </div>
    `;
    cardsWrapper.insertAdjacentElement("beforeend",card);
    return card;
}

async function displayMore(nextEndpoint) {
    console.log(nextEndpoint);
    if (nextEndpoint !== "undefined") {
        const cardsList = await dataFetch(nextEndpoint);
        const cardsArray = cardsList.data;
        cardsArray.forEach( (card) =>  card.image_uris !== undefined ? displayCard(card) : null);
        const nextPageEndpoint = cardsList.next_page;
        loadMoreButton.value = nextPageEndpoint;
        return;
    } else {
        loadMoreButton.style.display = "none";
        return;
    }
}

const typeSearchHandler = async function(button) {
    const typeToFetch = button.value;
    const typeEndpoint = `https://api.scryfall.com/cards/search?q=cube:modern&q=f:pauper&q=t:${typeToFetch}&order=released`; // VER ORDEN DE REQUEST PARA FETCHEO
    const cardsList = await dataFetch(typeEndpoint);
    const cardsArray = cardsList.data;
    cardsArray.forEach( (card) =>  card.image_uris !== undefined ? displayCard(card) : null);
    const nextPageEndpoint = cardsList.next_page;
    loadMoreButton.value = nextPageEndpoint;
    loadMoreButton.addEventListener ( "click", () => displayMore(loadMoreButton.value) );
    loadMoreButton.style.display = "initial";
}

//const handleWindowPositioning = () => window.scrollY > 1500 ?  buttonScrollUp.style.display = "fixed" : buttonScrollUp.style.display = "none";

typeSearchButtons.forEach( button => button.addEventListener('click', () => typeSearchHandler(button)));
//window.addEventListener('scroll', () => handleWindowPositioning );


// TODO : COMMITEAR
// TODO : HACER ANDAR EL PUTO BOTON DE SCROLL UP - NO ESTA CAMBIANDO LA PROPIEDAD DISPLAY 










// window.addEventListener('scroll', () => { window.scrollY > 1500 ? buttonScrollUp.style.display = "initial"  : buttonScrollUp.style.display = "none" });