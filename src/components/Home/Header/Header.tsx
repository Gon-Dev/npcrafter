import './Header.css'
import Navbar from './Navbar/Navbar'
import User from './User/User'

function Header() {
  return(
    <header className='header-wrapper'>
      <h1 className='header-title'>NpCrafter</h1>
      <Navbar />
      <User />
    </header>
  )
}

export default Header;