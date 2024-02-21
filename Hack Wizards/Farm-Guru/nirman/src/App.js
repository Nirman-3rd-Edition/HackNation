import Market from '../src/Pages/Market';
import Weather from '../src/Pages/Weather';
import Login from '../src/Pages/Login';
import Community from '../src/Pages/Community';
import Rentals from '../src/Pages/Rentals';
import Tutorials from '../src/Pages/Tutorials';
import Aboutus from '../src/Pages/Aboutus';
import Home from '../src/Pages/Home';
import Cart from '../src/Pages/Cart'
import Profile from '../src/Components/Profile';
import Settings from '../src/Components/Settings';
import { Route, Routes } from "react-router";
import Tutorial_Vdo from './Pages/Tutorial_Vdo';
import 'bootstrap/dist/css/bootstrap.css'
import Signup from './Pages/Signup'
function App() {

  return (
    <>
      <Routes>
        <Route exact path='/' element={<Home />}></Route>
        <Route path='/Tutorials' element={<Tutorials />}></Route>
        <Route path='/Login' element={<Login />}></Route>
        <Route path='/about' element={<Aboutus />}></Route>
        <Route path='/Community' element={<Community />}></Route>
        <Route path='/Market' element={<Market  />}></Route>
        <Route path='/Rentals' element={<Rentals />}></Route>
        <Route path='/Weather' element={<Weather />}></Route>
        <Route path='/Market/Cart' element={<Cart />}></Route >
        <Route path='/Tutorials/videos' element={<Tutorial_Vdo />}></Route >
        <Route path='/Weather' element={<Weather />}></Route> 
        <Route path='/Signup' element={<Signup />}></Route> 
        <Route path='/Community/Profile' element={<Profile />}></Route>
        <Route path='/Community/Settings' element={<Settings />}></Route>
      </Routes>
    </>
  );
}

export default App;



