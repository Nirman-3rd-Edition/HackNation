import React from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Sidenav from "./navigation/Sidenav";
import "../Components/Settings.css";

function Settings() {
  
  return(
  <>
    {/* <Header />
    <div className="setting__container">
    <div className="setting__card"> 
      <div className="setting__item">
        <h2>Edit Profile</h2>
      </div>
      </div>
      <div className="setting__card">
      <div className="setting__item">
        <h2>Language</h2>
      </div>
      </div>
    </div>
    <Footer /> */}

<div className="settings__container">
    <Header />
    <div className="settings__row">
      <div className="settings__column settings__nav">
        <Sidenav />
      </div>
      <div className="settings__column">
        <div className="setting__card">
          <div className="setting__item">
            <h2>Edit Profile</h2>
          </div>
        </div>
        <div className="setting__card">
          <div className="setting__item">
            <h2>Language</h2>
          </div>
        </div>
      </div>
    </div>
    </div>
    <Footer />

  </>);
}

export default Settings;
