import React from "react";
import "./Sidenav.css";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import SendIcon from '@mui/icons-material/Send';
// import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";
import IosShareSharpIcon from "@mui/icons-material/IosShareSharp";
import MenuSharpIcon from "@mui/icons-material/MenuSharp";
import { useNavigate } from "react-router-dom";
// import Notifications from '@mui/icons-material/Notifications';

function Sidenav() {
  const navigate = useNavigate();

  return (
    <div className="sidenav">
      <div className="sidenav__card">
        <div className="sidenav__button"  onClick={() => navigate("/Community/Profile")}>
          <AccountCircleIcon /> <span>Profile</span>
        </div>
      </div>
      <div className="sidenav__card" onClick={() => navigate("/")}>
        <div className="sidenav__button">
          <HomeIcon /> <span>Home</span>
        </div>
      </div>
      {/* <div className="sidenav__card">
        <div className="sidenav__button">
          <SearchTwoToneIcon /> <span>Search</span>
        </div>
      </div> */}
      <div className="sidenav__card">
        <div className="sidenav__button">
          <IosShareSharpIcon /> <span>Post</span>
        </div>
      </div>
      <div className="sidenav__more">
        <div className="sidenav__card">
          <button className="sidenav__button" onClick={() => navigate("/Community/Settings")}>
            <MenuSharpIcon />
            <span>Setting</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Sidenav;
