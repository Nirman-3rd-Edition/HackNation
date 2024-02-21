import React from 'react';
import './DocPage.css'; // Import CSS file

class DoctorInfo extends React.Component {
  render() {
    return (
      <div className="hommies">
        <div className="head">
          <h1> DOCTOR INFORMATION </h1>
        </div>
        <div className="wrap1">
          <div className="box1">
            <div className="write">
              <h3 className="tittle">DOCTOR INFO</h3>
              <p className="sub_tittle">Dr Aakash</p>
              <p className="info">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos vitae fugit recusandae aperiam voluptates sit, inventore error ratione, deleniti quod quas natus possimus velit temporibus non ducimus rem, minima sint!</p>
              <button><a href='/BookingPage'>BOOK APPOINTMENT</a></button>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default DoctorInfo;