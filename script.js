import { startButton, hamburger, myNpcsButton, links } from "./selectors.js";
import { startHandler, handleScrollUpButton, handleNpcsButton, linkHandler } from "./handlers.js"
import { loadLandingRandomImg } from "./utils.js"

loadLandingRandomImg();
startButton.addEventListener('click',startHandler);
hamburger.addEventListener('click', () => links.style.maxHeight === "13rem" ? links.style.maxHeight = "0rem" : links.style.maxHeight = "13rem");
myNpcsButton.addEventListener('click',handleNpcsButton);
document.body.addEventListener('click', e => linkHandler(e));
window.addEventListener('scroll', handleScrollUpButton);