import './Home.css'
import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from './Footer/Footer';

function Home() {
  return(
    <div className='home-wrapper'>
      <Header />
      <Main />
      <Footer />
    </div>
  )
}

export default Home;