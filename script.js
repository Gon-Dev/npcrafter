import { startButton, hamburger } from "./selectors.js";
import { startHandler, handleScrollUpButton, handleHamburger } from "./handlers.js"
startButton.addEventListener('click',startHandler);
hamburger.addEventListener('click',handleHamburger);
window.addEventListener('scroll', handleScrollUpButton);