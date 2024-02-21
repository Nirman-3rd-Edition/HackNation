import React from "react";
import VideoSlider from "../components2/videoslider";
import MyCard from "../components2/MyCard";
import AtAGlance from "../components2/AtAGlance";
import glanceData from "../assets/data/glanceData";

const imagesWithDescriptions = glanceData;
export const HomePage = () => {
  return (
    <>
      <VideoSlider />
      <MyCard />
      <AtAGlance imagesWithDescriptions={imagesWithDescriptions} />
    </>
  );
};
