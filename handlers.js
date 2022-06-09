import { about, gallery, npcFormWrapper, nameNpc,keyInfoNpc,backgroundNpc,miscNpc, links, loadMoreButton, loading, cardsWrapper, buttonScrollUp } from "./selectors.js";
import { shuffle, displayCard, dataFetch, displayMore, hideAll } from "./utils.js";
import { npcList } from "./npcs.js";

export function handleError(err) {
    console.log("ERRRRRRRRROOOR");
    console.log(err);
    console.log("-----------------SEPARADOR-----------------");
}
export function handleScrollUpButton() {
    let yPosition = window.scrollY;
    yPosition > 1000 ? buttonScrollUp.style.opacity = 100 : buttonScrollUp.style.opacity = 0;
    buttonScrollUp.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}
export async function startHandler() {
    hideAll();
    gallery.style.display = "initial";
    loadMoreButton.style.display = "none";
    loading.style.display = "none";
    cardsWrapper.innerHTML = "";
    const typeEndpoint = `https://api.scryfall.com/cards/search?q=format:standard&q=%28type%3Aarcher+OR+type%3Aassassin+OR+type%3Abarbarian+OR+type%3Abard+OR+type%3Aberserker+OR+type%3Acoward+OR+type%3Adog+OR+type%3Adruid+OR+type%3Agnome+OR+type%3Agoblin+OR+type%3Aguest+OR+type%3Ahuman+OR+type%3Aknight+OR+type%3Akobold+OR+type%3Akor+OR+type%3Amonk+OR+type%3Aninja+OR+type%3Anoble+OR+type%3Apirate+OR+type%3Aranger+OR+type%3Asurvivor+OR+type%3Avillain+OR+type%3Awarlock%29&order=released&is:hires`;
    const cardsList = await dataFetch(typeEndpoint);
    const cardsArray = cardsList.data;
    shuffle(cardsArray);
    cardsArray.forEach( (card) =>  card.image_uris !== undefined ? displayCard(card) : null);
    const nextPageEndpoint = cardsList.next_page;
    loadMoreButton.value = nextPageEndpoint;
    loadMoreButton.addEventListener ( "click", () => displayMore(loadMoreButton.value) );
    loadMoreButton.style.display = "initial";
}
export function handleHamburger() {
    links.style.maxHeight === "13rem" ? links.style.maxHeight = "0rem" : links.style.maxHeight = "13rem";
}
export function handleSaveNpc(event) {
    const newNpc = {
        name: nameNpc.value,
        keyInfo: keyInfoNpc.value,
        background: backgroundNpc.value,
        misc: miscNpc.value,
        srcImg: event.target.parentElement.parentElement.nextElementSibling.currentSrc,
    }
    npcList.push(newNpc);
    localStorage.setItem(`${newNpc.name}`,JSON.stringify(newNpc));
    npcFormWrapper.classList.remove('open');
}
export function handleNpcsButton() {
    hideAll();
}
export function linkHandler(e) {
    if (e.target.classList.contains("gallery-link")){
        hideAll();
        e.preventDefault();
        startHandler();
    } else if (e.target.classList.contains("about-link")) {
        e.preventDefault();
        hideAll();
        about.style.display = "block";
        console.log(about);
    }
}