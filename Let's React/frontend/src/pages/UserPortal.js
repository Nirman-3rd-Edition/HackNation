import React from 'react';
import './User.css'; 



class UserPortal extends React.Component {
  render() {
    return (
      <div>
      <div className="hommies">
        <div className="head">
          <h1> USER PORTAL</h1>
        </div>
        {/* Uncomment below to enable login/register links */}
        {/* <div className="div_line">
          <a className="Log">LOGIN</a>
          <a className="Sign">REGISTER</a>
        </div> */}
        <div className="wrap1">
          <div className="box1">
            <div className="write">
              <h3>Book Your Ambulance</h3>
              <p>Tap for Trusted Emergency Transport, when Minutes Matter the Most.Book from our Certified and Trusted Ambulance partners.Get your Nearest Ambulance Dispatched!! </p>
            </div>
            <div className="Buton">
              <a href=''>VISIT</a>
            </div>
          </div>
          <div className="box2">
            <div className="write">
              <h3>Virtual doctors' Consultation</h3>
              <p>No need to travel hours for your Appointments. Get the best Doctors' advice from the comfort of home/workplace. Book yours now. </p>
            </div>
            <div className="Buton">
              <a href='/DoctorInfo'>VISIT</a>
            </div>
          </div>
          {/* Uncomment below to enable additional boxes */}
          {/* <div className="box3">
            <div className="write">
              <h3>Hospital</h3>
              <p></p>
            </div>
            <div className="Buton">
              <a>VISIT</a>
            </div>
          </div> */}
        </div>
        <div className="wrap3">
          <div className="box4">
            <div className="write">
              <h3>Hospital Beds/Rooms</h3>
              <p>Let our platform Guide you to beds ,where doctors can treat you the best.cutting the Hassle off searching for places with best treatment and hygiene .Search the suitable and comfortable beds and Book them fast.</p>
            </div>
            <div className="Buton">
              <a href='/Hospitallist'>VISIT</a>
            </div>
          </div>
          {/* Uncomment below to enable additional boxes */}
          {/* <div className="box5">
            <div className="write">
              <h3>Hospital</h3>
              <p></p>
            </div>
            <div className="Buton">
              <button>VISIT</button>
            </div>
          </div> */}
          <div className="box6">
            <div className="write">
              <h3>Emergency Alert System</h3>
              <p>At the Time of Utmost Urgency, Send a SOS to our Nearest Available Operation Theatre,that can save time of Surgery Preparation.Use with Caution and Responsibilty. Help reaches at your door faster than before.</p>
            </div>
            <div className="Buton">
              <a href='/EmergencyAlertSystem'>VISIT</a>
            </div>
          </div>
        </div>
      </div>
      </div>
    );
  }
}


export default UserPortal;