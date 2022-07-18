import { heroImg, discardNpc, myNpcsArticle, npcTextareas, about, gallery, landing, saveNpc, npcImg, npcFormWrapper, loading, modalOuter, cardsWrapper, fullImage, loadMoreButton, buttonScrollUp } from "./selectors.js";
import { handleDiscardNpc, handleError, handleSaveNpc } from "./handlers.js";
export function shuffle(array) {
    array.sort((a, b) => 0.5 - Math.random());
}
export async function dataFetch(endpoint) {
    loading.style.display = "block";
    setTimeout(100);
    const response = await fetch(endpoint).catch(handleError);
    const data = await response.json();
    loading.style.display = "none";
    return data;
}
export async function loadLandingRandomImg() {
    const randomCardEndpoint = "https://api.scryfall.com/cards/random?q=format:standard";
    const randomCardRequest = await dataFetch(randomCardEndpoint);
    const randomCardImg = randomCardRequest.image_uris.art_crop;
    heroImg.src = randomCardImg;
}
export function restoreScroll() {
    document.body.style.overflow = "scroll";
}
export function closeModal(modal) {
    restoreScroll();
    modal.classList.remove('open');
}
export function displayCard(cardData) {
    const cardDiv = document.createElement("div");
    const cropUrl = cardData.image_uris.art_crop;
    cardDiv.innerHTML = `
    <img class="cardArt" src="${cropUrl}" alt="">
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
    createNpcButton.addEventListener('click', () => createNpc(cropUrl));
    sourceButton.addEventListener('click', event => displayFullCard(event));
    cardsWrapper.insertAdjacentElement("beforeend",cardDiv);
    return cardDiv;
}
export function createNpc(cropUrl,name,keyInfo,background,misc) {
    npcTextareas.forEach( (textarea) => textarea.value = "" );
    if (name !== undefined) {
        const [textAreaName,textAreaKeyInfo,textAreaBackground,textAreaMisc] = npcTextareas;
        textAreaName.value = name;
        textAreaKeyInfo.value = keyInfo;
        textAreaBackground.value = background;
        textAreaMisc.value = misc;
    }
    npcImg.src = "";
    npcImg.src = cropUrl;
    document.body.style.overflow = "hidden";
    buttonScrollUp.style.opacity = 0;
    npcFormWrapper.classList.add("open");
    npcFormWrapper.addEventListener('click', event => {
        const clickOutside = !event.target.closest(".npc-form-inner");
        clickOutside ? closeModal(npcFormWrapper) : null;
    })
    saveNpc.addEventListener('click', handleSaveNpc);
    discardNpc.addEventListener('click', handleDiscardNpc);
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
        clickOutside ? closeModal(modalOuter) : null;
        buttonScrollUp.style.opacity = 100;
        document.body.style.overflow = "auto"; 
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
        loadMoreButton.style.display = "block";
    } else {
        loadMoreButton.style.display = "none";
    }
}
export function hideAll() {
    landing.style.display !== "none" ? landing.style.display = "none" : null;
    gallery.style.display !== "none" ? gallery.style.display = "none" : null;
    about.style.display !== "none" ? about.style.display = "none" : null;
    myNpcsArticle.style.display !== "none" ? myNpcsArticle.style.display = "none" : null;
    return;
}
export function orderAtoZ(array) {
    array.sort(function(a, b) {
        var npcA = a.name.toUpperCase();
        var npcB = b.name.toUpperCase();
        return (npcA < npcB) ? -1 : (npcA > npcB) ? 1 : 0;
    })
}