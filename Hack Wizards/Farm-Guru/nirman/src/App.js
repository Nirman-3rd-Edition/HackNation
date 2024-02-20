import './App.css';
import Market from '../src/Pages/Market';
import Weather from '../src/Pages/Weather';
import Login from '../src/Pages/Login';
import Community from '../src/Pages/Community';
import Rentals from '../src/Pages/Rentals';
import Tutorials from '../src/Pages/Tutorials';
import Aboutus from '../src/Pages/Aboutus';
import Home from '../src/Pages/Home';
import { Route, Routes } from "react-router";

function App() {
  return (
    <>
      <Routes>
        <Route exact path='/' element={<Home />}></Route>
        <Route path='/Tutorials' element={<Tutorials />}></Route>
        <Route path='/Login' element={<Login />}></Route>
        <Route path='/about' element={<Aboutus />}></Route>
        <Route path='/Community' element={<Community />}></Route>
        <Route path='/Market' element={<Market />}></Route>
        <Route path='/Rentals' element={<Rentals />}></Route>
        <Route path='/Weather' element={<Weather />}></Route>
      </Routes>
    </>
  );
}

export default App;
