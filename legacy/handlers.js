import { landing, myNpcsVisor, myNpcsList, myNpcsArticle, about, gallery, npcFormWrapper, nameNpc,keyInfoNpc,backgroundNpc, miscNpc, links, loadMoreButton, loading, cardsWrapper, buttonScrollUp } from "./selectors.js";
import { restoreScroll, orderAtoZ, shuffle, displayCard, dataFetch, displayMore, hideAll, createNpc, closeModal } from "./utils.js";
import { npcList } from "./npcs.js";
export function handleError(err) {
    console.log("ERRRRRRRRROOOR");
    console.log(err);
    console.log("-----------------SEPARADOR-----------------");
}
export function handleScrollUpButton() {
    let yPosition = window.scrollY;
    yPosition > 500 ? buttonScrollUp.style.opacity = 100 : buttonScrollUp.style.opacity = 0;
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
    loadMoreButton.style.display = "block";
}
export function handleDiscardNpc() {
    restoreScroll();
    closeModal(npcFormWrapper);
}
export function handleSaveNpc(event) {
    const newNpc = {
        name: nameNpc.value,
        keyInfo: keyInfoNpc.value,
        background: backgroundNpc.value,
        misc: miscNpc.value,
        srcImg: event.target.parentElement.parentElement.nextElementSibling.currentSrc,
    }
    npcList.push(newNpc); // npcList -> module with the current npcs created
    localStorage.setItem(`${newNpc.name}`,JSON.stringify(newNpc));
    closeModal(npcFormWrapper);
    restoreScroll();
    hideAll();
    handleNpcsButton();
}
function getAllFromStorage() {
    myNpcsList.innerHTML = "";
    let myNpcsArray = [];
    Object.keys(localStorage).forEach((key) => {
        let rawNpc = localStorage.getItem(key);
        let objectNpc = JSON.parse(rawNpc);
        myNpcsArray.push(objectNpc);
    });
    return myNpcsArray;
}
async function handleNpcEdit(e) {
    const npcName = e.currentTarget.parentElement.parentElement.children[0].children[0].children[0].textContent;
    const npcKeyInfo = e.currentTarget.parentElement.parentElement.children[0].children[0].children[2].textContent;
    const npcImg = e.currentTarget.parentElement.parentElement.children[0].children[1].src;
    const npcBackground = e.currentTarget.parentElement.parentElement.children[2].children[1].textContent;
    const npcMisc = e.currentTarget.parentElement.parentElement.children[2].children[3].textContent;
    createNpc(npcImg,npcName,npcKeyInfo,npcBackground,npcMisc);
}
function handleNpcDelete(e) {
    const npcName = e.currentTarget.parentElement.parentElement.children[0].children[0].children[0].textContent;
    const confirm = document.createElement("article");
    confirm.classList.add("confirm-delete-outer");
    confirm.classList.add("flex-column-centered");
    confirm.innerHTML = `
    <div class="confirm-delete-wrapper ">
        <p class="confirm-delete-title">DANGER !</p>
        <p class="confirm-delete-text">You are about to erase your NPC FOREVER</p>
        <div class="confirm-delete-button-wrapper flex-row-centered">
            <button value="${npcName}"class="confirm-delete-yes">DELETE</button>
            <button class="confirm-delete-no">KEEP IT</button>
        </div>
    </div>
    `;
    document.body.appendChild(confirm);
    const confirmDelete = document.querySelector(".confirm-delete-outer");
    const confirmYes = document.querySelector(".confirm-delete-yes");
    const confirmNo = document.querySelector(".confirm-delete-no");
    confirmDelete.style.display = "flex";
    confirmNo.addEventListener('click', () => confirmDelete.style.display = "none");
    confirmYes.addEventListener('click', (e) => {
        const npcName = e.target.value;
        localStorage.removeItem(npcName);
        myNpcsVisor.innerHTML = "";
        confirmDelete.style.display = "none";
        hideAll();
        handleNpcsButton();
    });
}
function displayNpcVisor(e) {
    myNpcsVisor.innerHTML = "";
    const clickedNpcName = e.currentTarget.firstElementChild.textContent;
    const localNpc = localStorage.getItem(clickedNpcName);
    const npc = JSON.parse(localNpc);
    const npcCard = document.createElement("div");
    npcCard.classList.add("npcVisorCard");
    npcCard.innerHTML = `
        <div class="npcVisorHeader">
            <div class="npcVisorTitle">
                <h2 class="npcVisorName">${npc.name}</h2>
                <div class="npcVisorSeparator"></div>
                <h5 class="npcVisorKeyInfo">KEY INFORMATION</h5>
                <p class="npcVisorKeyInfoText">${npc.keyInfo}</p>
            </div>
            <img  class="npcVisorImg" src="${npc.srcImg}" alt="">
        </div>
        <div class="npcVisorSeparator"></div>
        <div class="npcVisorMoreInfo">
            <h5 class="npcVisorBackground">BACKGROUND</h5>
            <p class="npcVisorBackgroundText">${npc.background}</p>
            <div class="npcVisorSeparator"></div>
            <h5 class="npcVisorMisc">MISC</h5>
            <p class="npcVisorMiscText">${npc.misc}</p>
        </div>
        <div class="npcButtonsWrapper">
            <button class="npcEdit"><svg class="editButtonSvg" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"	 viewBox="0 0 330 330" style="enable-background:new 0 0 330 330;" xml:space="preserve"><g id="XMLID_23_">	<path id="XMLID_24_" d="M75,180v60c0,8.284,6.716,15,15,15h60c3.978,0,7.793-1.581,10.606-4.394l164.999-165		c5.858-5.858,5.858-15.355,0-21.213l-60-60C262.794,1.581,258.978,0,255,0s-7.794,1.581-10.606,4.394l-165,165		C76.58,172.206,75,176.022,75,180z M105,186.213L255,36.213L293.787,75l-150,150H105V186.213z"/>	<path id="XMLID_27_" d="M315,150.001c-8.284,0-15,6.716-15,15V300H30V30H165c8.284,0,15-6.716,15-15s-6.716-15-15-15H15		C6.716,0,0,6.716,0,15v300c0,8.284,6.716,15,15,15h300c8.284,0,15-6.716,15-15V165.001C330,156.716,323.284,150.001,315,150.001z"		/></g></svg></button>
            <button value="${npc.name}" class="npcDelete"><svg class="deleteButtonSvg" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"	 viewBox="0 0 284.011 284.011" style="enable-background:new 0 0 284.011 284.011;" xml:space="preserve"><g>	<g>		<path d="M235.732,66.214l-28.006-13.301l1.452-3.057c6.354-13.379,0.639-29.434-12.74-35.789L172.316,2.611			c-6.48-3.079-13.771-3.447-20.532-1.042c-6.76,2.406-12.178,7.301-15.256,13.782l-1.452,3.057L107.07,5.106			c-14.653-6.958-32.239-0.698-39.2,13.955L60.7,34.155c-1.138,2.396-1.277,5.146-0.388,7.644c0.89,2.499,2.735,4.542,5.131,5.68			l74.218,35.25h-98.18c-2.797,0-5.465,1.171-7.358,3.229c-1.894,2.059-2.839,4.815-2.607,7.602l13.143,157.706			c1.53,18.362,17.162,32.745,35.588,32.745h73.54c18.425,0,34.057-14.383,35.587-32.745l11.618-139.408l28.205,13.396			c1.385,0.658,2.845,0.969,4.283,0.969c3.74,0,7.328-2.108,9.04-5.712l7.169-15.093C256.646,90.761,250.386,73.175,235.732,66.214z			 M154.594,23.931c0.786-1.655,2.17-2.905,3.896-3.521c1.729-0.614,3.59-0.521,5.245,0.267l24.121,11.455			c3.418,1.624,4.878,5.726,3.255,9.144l-1.452,3.057l-36.518-17.344L154.594,23.931z M169.441,249.604			c-0.673,8.077-7.55,14.405-15.655,14.405h-73.54c-8.106,0-14.983-6.328-15.656-14.405L52.35,102.728h129.332L169.441,249.604z			 M231.62,96.835l-2.878,6.06L83.057,33.701l2.879-6.061c2.229-4.695,7.863-6.698,12.554-4.469l128.661,61.108			C231.845,86.509,233.85,92.142,231.62,96.835z"/>	</g></g></svg></button>
        </div>
    `;
    myNpcsVisor.appendChild(npcCard);
    const npcEditButton = document.querySelector(".npcEdit");
    const npcDeleteButton = document.querySelector(".npcDelete");
    npcEditButton.addEventListener('click', e => handleNpcEdit(e));
    npcDeleteButton.addEventListener('click', e => handleNpcDelete(e));
}
function displayNpcList(npc) {
    myNpcsVisor.innerHTML = "";
    const npcItemWrapper = document.createElement("li");
    npcItemWrapper.innerHTML = `
        <p class="npcListItemName">${npc.name}</p>
        <img class="npcListImg" src="${npc.srcImg}" alt="npc thumbnail">
    `;
    npcItemWrapper.classList.add("npcListItem");
    npcItemWrapper.classList.add("flex-row-centered");
    npcItemWrapper.addEventListener('click', e => displayNpcVisor(e));
    myNpcsList.appendChild(npcItemWrapper);
}
export function handleNpcsButton() {
    hideAll();
    myNpcsArticle.style.display = "flex";
    let npcsInStorage = getAllFromStorage();
    orderAtoZ(npcsInStorage);
    npcsInStorage.forEach( npc => displayNpcList(npc));
}
export function linkHandler(e) {
    e.target.classList.contains("links") || e.target.classList.contains("hamburger-svg") ? null : links.style.maxHeight = "0rem";
    if (e.target.classList.contains("home-link")) {
        hideAll();
        e.preventDefault();
        landing.style.display = "block";
        links.style.maxHeight = "0rem";
    } else if (e.target.classList.contains("gallery-link")){
        hideAll();
        e.preventDefault();
        startHandler();
        links.style.maxHeight = "0rem";
    } else if (e.target.classList.contains("about-link")) {
        e.preventDefault();
        hideAll();
        about.style.display = "block";
        links.style.maxHeight = "0rem";
    }
}