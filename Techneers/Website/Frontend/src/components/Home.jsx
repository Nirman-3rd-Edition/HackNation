import Button from "../layouts/Button";
import img from "../assets/img/hero.jpg";
import { Link } from "react-scroll";
import GraphemeSplitter from "grapheme-splitter";
import { TypeAnimation } from "react-type-animation";
import styled from "styled-components";
import Cube from "./Cube/Cube";

const Home = () => {
  const splitter = new GraphemeSplitter();
  const backgroundColor = `bg-brightColor`;

  return (
    <div className=" min-h-screen lg:min-h-[90vh] flex flex-col justify-center lg:flex-row items-center md:mx-32 mx-5 Mycomponentt">
      <div className=" flex flex-col text-center lg:text-start gap-5">
        <h1 className=" font-semibold text-5xl leading-tight mb-3">
          Discover the Best Legal Service Providers <br />
          <TypeAnimation
            splitter={(str) => splitter.splitGraphemes(str)}
            sequence={[
              "Advocates",
              2000,
              "वकील",
              2000,
              "Arbitrators",
              2000,
              "पंच",
              2000,
              "Mediators",
              2000,
              "मध्यस्थ",
              2000,
              "Notary",
              2000,
              "Document Writes",
              2000,
              "दस्तावेज़ लेखक",
              2000,
            ]}
            style={{ fontSize: "4rem", color: "orange" }}
            repeat={Infinity}
          />
        </h1>

        <h1 className="text-xl leading-tight mt-2">
          "Empowering Change, Upholding Justice: Where Law Meets Purpose."
        </h1>

        <div className="lg:pl-24 ">
          <Link to="destination" spy={true} smooth={true} duration={500}>
            <Button title="Explore Here" backgroundColor={backgroundColor} />
          </Link>
        </div>
      </div>
      {/* <div className="mt-1 lg:mt-0 w-full h-full lg:w-4/5">
        <img src={img} alt="img" className="Mycomponentt" />
      </div> */}
      <div className="mt-1 lg:mt-0 w-full h-full lg:w-4/5">
        <Cube />
      </div>
    </div>
  );
};

const MyComponentt = styled.div`
  mix-blend-mode: multiply;
`;

export default Home;
