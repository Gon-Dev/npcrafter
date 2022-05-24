import { loadMoreButton, loading, cardsWrapper, buttonScrollUp } from "./selectors.js";
import { shuffle, displayCard, dataFetch, displayMore} from "./utils.js";

export function handleError(err) {
    console.log("ERRRRRRRRROOOR");
    console.log(err);
    console.log("-----------------SEPARADOR-----------------");
}
export function handleScrollUpButton(par) {
    let yPosition = window.scrollY;
    yPosition > 1000 ? buttonScrollUp.style.opacity = 100 : buttonScrollUp.style.opacity = 0;
    buttonScrollUp.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}
export async function typeSearchHandler(button) {
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