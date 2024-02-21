import { useState, useEffect } from "react";
import "./App.css";
import Footer from "./Footer";
import Navbar from "./components2/navbar";
import { HomePage } from "./pages/HomePage";
import VenueCard from "./pages/VenueCard";
import { Routes, Route } from "react-router-dom";
import VenueCaraousel from "./pages/VenueCaraousel";
import PhotographerCards from "./pages/photographerCard";
import Photographer from "./components2/photographer";
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" exact element={<HomePage />} />
        <Route path="/venues" element={<VenueCard />} />
        <Route path="/venuedetails" element={<VenueCaraousel />} />
        <Route path="/photographer" element={<PhotographerCards />} />
        <Route path="/photodetails" element={<Photographer />} />
        {/* <HomePage/> */}
        {/* <VenueCard /> */}
      </Routes>
      <Footer />
    </>
  );
}

export default App;
