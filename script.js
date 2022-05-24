import { typeSearchButtons } from "./selectors.js";
import { handleScrollUpButton, typeSearchHandler} from "./handlers.js"
window.addEventListener('scroll', handleScrollUpButton);
typeSearchButtons.forEach( button => button.addEventListener('click', () => typeSearchHandler(button)));
