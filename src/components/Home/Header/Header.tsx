import './Header.css'
import Navbar from './Navbar/Navbar'
import User from './User/User'

function Header() {
  return(
    <header className='header-wrapper'>
      <h2 className='header-title'>NpCrafter</h2>
      <Navbar />
      <User />
    </header>
  )
}

export default Header;