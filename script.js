import { startButton, hamburger, myNpcsButton, links } from "./selectors.js";
import { startHandler, handleScrollUpButton, handleHamburger, handleNpcsButton, linkHandler } from "./handlers.js"
startButton.addEventListener('click',startHandler);
hamburger.addEventListener('click',handleHamburger);
myNpcsButton.addEventListener('click',handleNpcsButton);
links.addEventListener('click', e => linkHandler(e));
window.addEventListener('scroll', handleScrollUpButton);