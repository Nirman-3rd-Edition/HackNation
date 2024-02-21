import React from "react";
import "./Cube.css";

const Cube = () => {
  return (
    <div>
      <div className="wrapper">
        <div className="box-area">
          <div id="box-front" className="box">
            1
          </div>
          <div id="box-right" className="box">
            2
          </div>
          <div id="box-back" className="box">
            3
          </div>
          <div id="box-left" className="box">
            4
          </div>
          <div id="box-top" className="box">
            5
          </div>
          <div id="box-bottom" className="box">
            6
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cube;
