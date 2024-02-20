import React from 'react';
import './User.css'; 

const UserPortal = () => {
  return (
    <div className="hommies">
      <div className="head">
        <h1> USER PORTAL</h1>
      </div>
      {/* <div className="div_line">
        <a className="Log">LOGIN</a>
        <a className="Sign">REGISTER</a>
      </div> */}
      <div className="wrap1">
        <div className="box1">
          <div className="write">
            <h3>SEND EMERGENCY ALERT</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos vitae fugit recusandae aperiam voluptates sit, inventore error ratione, deleniti quod quas natus possimus velit temporibus non ducimus rem, minima sint!</p>
          </div>
          <div className="Buton">
            <button>VIST</button>
          </div>
        </div>
        <div className="box2">
          <div className="write">
            <h3>HosPiTal</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos vitae fugit recusandae aperiam voluptates sit, inventore error ratione, deleniti quod quas natus possimus velit temporibus non ducimus rem, minima sint!</p>
          </div>
          <div className="Buton">
            <a>VISIT</a>
          </div>
        </div>
      </div>
      <div className="wrap3">
        <div className="box4">
          <div className="write">
            <h3>HosPiTal</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos vitae fugit recusandae aperiam voluptates sit, inventore error ratione, deleniti quod quas natus possimus velit temporibus non ducimus rem, minima sint!</p>
          </div>
          <div className="Buton">
            <a>VISIT</a>
          </div>
        </div>
        <div className="box5">
          <div className="write">
            <h3>HosPiTal</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos vitae fugit recusandae aperiam voluptates sit, inventore error ratione, deleniti quod quas natus possimus velit temporibus non ducimus rem, minima sint!</p>
          </div>
          <div className="Buton">
            <a>VISIT</a>
          </div>
        </div>

      </div>
    </div>
  );
};

export default UserPortal;