import Navbar from "../../components/Navbar";
import Home from "../../components/Home";
import Features from "../../components/Features";
import Destination from "../../components/Destination";
import About from "../../components/About";
import Contact from "../../components/Contact";
import Footer from "../../components/Footer";
import AchieversPage from "../../components/AchieversPage";

const Homepage = () => {
  return (
    <div>
      <Navbar />

      <main>
        <div id="home">
          <Home />
        </div>

        <div id="features">
          <Features />
        </div>

        <div id="destination">
          <Destination />
        </div>

        <div id="about">
          <About />
        </div>

        {/* <div>
          <AchieversPage />
        </div> */}

        <div id="contact">
          <Contact />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Homepage;
