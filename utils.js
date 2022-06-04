import { loading, modalOuter, cardsWrapper, fullImage, loadMoreButton, buttonScrollUp } from "./selectors.js";
import { handleError, handleScrollUpButton } from "./handlers.js";

export function sayHi(name) {
    console.log(name);
}
export function shuffle(array) {
    array.sort((a, b) => 0.5 - Math.random());
}
export async function dataFetch(endpoint) {
    loading.style.display = "inherit";
    setTimeout(100);
    const response = await fetch(endpoint).catch(handleError);
    const data = await response.json();
    loading.style.display = "none";
    return data;
}
export function closeModal() {
    modalOuter.classList.remove('open');
}
export function displayCard(cardData) {
    const cardDiv = document.createElement("div");
    cardDiv.innerHTML = `
    <img class="cardArt" src="${cardData.image_uris.art_crop}" alt="">
    <h1 class="cardName">"${cardData.name}"</h1>
    <h2 class="cardArtist">${cardData.artist} - ${cardData.frame} </h2>
    <div class="displayedCardButtonWrapper">
        <button class="cardSource" value=${cardData.image_uris.normal}>SOURCE CARD</button>
        <button class="createNpc">CREATE NPC</button>
    </div>
    <div class="cardDivider"></div>
    `;
    cardDiv.className = "card";
    const sourceButton = cardDiv.children[3].children[0];
    const createNpcButton = cardDiv.children[3].children[1];
    createNpcButton.addEventListener('click', event => createNpc(event));
    sourceButton.addEventListener('click', event => displayFullCard(event));
    cardsWrapper.insertAdjacentElement("beforeend",cardDiv);
    return cardDiv;
}
function createNpc(event) {
    console.log(event);
}
export function displayFullCard (event) {
    document.body.style.overflow = "hidden";
    buttonScrollUp.style.opacity = 0;
    fullImage.src = "";
    const fullCardToShow = event.target.value;
    fullImage.src = fullCardToShow;
    modalOuter.classList.add('open');
    modalOuter.addEventListener('click', event => {
        const clickOutside = !event.target.closest('.full-image');
        clickOutside ? closeModal() : null;
        buttonScrollUp.style.opacity = 100;
        document.body.style.overflow = "auto"; 
    })
    window.addEventListener('keydown', event => {
        if (event.key === 'Escape') {
          closeModal();
        }
    })
}
export async function displayMore(nextEndpoint) {
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

