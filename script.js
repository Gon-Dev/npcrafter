const typeSearchButtons = document.querySelectorAll(".search");
const cardsWrapper = document.querySelector(".cards-wrapper");
const loadMoreButton = document.querySelector(".load-more");
const buttonScrollUp = document.querySelector(".scroll-to-top");
const loading = document.querySelector(".loading");
const modalOuter = document.querySelector(".modal-outer");
const fullImage = document.querySelector(".full-image");
buttonScrollUp.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' })  ) ;

function handleError(err) {
    console.log("ERRRRRRRRROOOR");
    console.log(err);
    console.log("-----------------SEPARADOR-----------------");
}
function shuffle(array) {
    array.sort((a, b) => 0.5 - Math.random());
}
function handleScrollUpButton(par) {
    let yPosition = window.scrollY;
    yPosition > 1000 ? buttonScrollUp.style.opacity = 100 : buttonScrollUp.style.opacity = 0 
}
async function dataFetch(endpoint) {
    loading.style.display = "inherit";
    setTimeout(100);
    const response = await fetch(endpoint).catch(handleError);
    const data = await response.json();
    loading.style.display = "none";
    return data;
}
function closeModal() {
    modalOuter.classList.remove('open');
}
function displayFullCard (event) {
    //MODAL ANDA OK, FALTA PASARLE LA IMAGEN DE LA CARTA ENTERA AL fullImage SRC
    const fullCardToShow = event.target.value;
    fullImage.src = fullCardToShow;
    
    modalOuter.classList.add('open');
    modalOuter.addEventListener('click', event => {
        const clickOutside = !event.target.closest('.full-image');
        clickOutside ? closeModal() : null;
    });
    window.addEventListener('keydown', event => {
        if (event.key === 'Escape') {
          closeModal();
        }
    });

}
function displayCard(cardData) {
    const cardDiv = document.createElement("div");
    cardDiv.innerHTML = `
    <img class="cardArt" src="${cardData.image_uris.art_crop}" alt="">
    <h1 class="cardName">"${cardData.name}"</h1>
    <h2 class="cardArtist">${cardData.artist} - ${cardData.frame} </h2>
    <button class="cardSource" value=${cardData.image_uris.normal}>SOURCE CARD</button>
    <div class="cardDivider"></div>
    `;
    cardDiv.className = "card";
    const button = cardDiv.childNodes[7];
    const fullCardUrl = cardData.image_uris.normal;
    button.addEventListener('click', event => displayFullCard(event));
    cardsWrapper.insertAdjacentElement("beforeend",cardDiv);
    return cardDiv;
}
async function displayMore(nextEndpoint) {
    loadMoreButton.style.display = "none";
    if (nextEndpoint !== "undefined") {
        const cardsList = await dataFetch(nextEndpoint);
        const cardsArray = cardsList.data;
        cardsArray.forEach( (card) =>  card.image_uris !== undefined ? displayCard(card) : null);
        const nextPageEndpoint = cardsList.next_page;
        loadMoreButton.value = nextPageEndpoint;
        loadMoreButton.style.display = "initial";
        return;
    } else {
        loadMoreButton.style.display = "none";
        return;
    }
}
const typeSearchHandler = async function(button) {
    loadMoreButton.style.display = "none";
    loading.style.display = "none";
    cardsWrapper.innerHTML = "";
    const typeToFetch = button.value;
    const typeEndpoint = `https://api.scryfall.com/cards/search?q=cube:modern&q=f:pauper&q=t:${typeToFetch}&order=released`; // VER ORDEN DE REQUEST PARA FETCHEO
    const cardsList = await dataFetch(typeEndpoint);
    const cardsArray = cardsList.data;
    shuffle(cardsArray);
    cardsArray.forEach( (card) =>  card.image_uris !== undefined ? displayCard(card) : null);
    const nextPageEndpoint = cardsList.next_page;
    loadMoreButton.value = nextPageEndpoint;
    loadMoreButton.addEventListener ( "click", () => displayMore(loadMoreButton.value) );
    loadMoreButton.style.display = "initial";
}

window.addEventListener('scroll',handleScrollUpButton);

typeSearchButtons.forEach( button => button.addEventListener('click', () => typeSearchHandler(button)));
