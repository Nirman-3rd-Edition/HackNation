
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './header/Header';
import Main_page from './body/Main_page';
import Footer from './footer/Footer';

function App() {

  return (
    <div className='container'>
      <Header/>
      <Main_page/>
      <Footer/>
    </div>
  )
}

export default App
