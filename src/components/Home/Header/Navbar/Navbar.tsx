import './Navbar.css'

function Navbar() {

  function handleClick(event: React.MouseEvent<HTMLElement>) {
    event.preventDefault();
    const clickedElement: HTMLAnchorElement = event.target as HTMLAnchorElement;
    const navElements: NodeListOf<HTMLElement> = document.querySelectorAll(".navbar-link");
    navElements.forEach( element => element.classList.remove("active"))
    clickedElement.classList.add("active"); 
  }

  return (
    <nav className='navbar-wrapper'>
      <ul>
        <li>
          <a href="" className='navbar-link active' onClick={(event) => handleClick(event)}>Home</a>
        </li>
        <li>
          <a href="" className='navbar-link' onClick={(event) => handleClick(event)}>Create</a>
        </li>
        <li>
          <a href="" className='navbar-link' onClick={(event) => handleClick(event)}>My Npcs</a>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar;