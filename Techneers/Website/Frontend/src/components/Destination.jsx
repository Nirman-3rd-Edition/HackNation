import React from "react";
import img1 from "../assets/img/2.jpg";
import img2 from "../assets/img/3.jpg";
import img3 from "../assets/img/4.jpg";

import DestinationCard from "../layouts/DestinationCard";

const Destination = () => {
  return (
    <div className=" min-h-screen flex flex-col justify-center md:mx-32 mx-5">
      <h1 className=" font-medium text-center text-4xl lg:mt-0 mt-16">
        Most Popular Services
      </h1>

      <div className=" flex flex-col lg:flex-row gap-5 mt-14">
        <DestinationCard
          img={img1}
          title="Experienced LSPs"
          para="Unlock Justice: Your Trusted Legal Service Partner. Expertise, Integrity, and Results – We Stand by Your Side."
        />
        <DestinationCard
          img={img2}
          title="Document Writers"
          para="Unlock Justice: Your Trusted Legal Service Partner. Expertise, Integrity, and Results – We Stand by Your Side."
        />
        <DestinationCard
          img={img3}
          title="Transparency"
          para="Unlock Justice: Your Trusted Legal Service Partner. Expertise, Integrity, and Results – We Stand by Your Side."
        />
      </div>
    </div>
  );
};

export default Destination;
