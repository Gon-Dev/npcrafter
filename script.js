import { startButton } from "./selectors.js";
import { startHandler, handleScrollUpButton } from "./handlers.js"
startButton.addEventListener('click',startHandler);
window.addEventListener('scroll', handleScrollUpButton);
