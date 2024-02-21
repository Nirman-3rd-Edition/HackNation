import * as React from "react";
import "../styles/navbar.css";
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";
import SearchBox from "./searchbox";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}

const ColorButton = styled(Button)(({ theme }) => ({
  color: "#e7e2fd",
  fontWeight: "bolder",
  // backgroundColor: purple[500],
  "&:hover, &:active": {
    background: "linear-gradient(to top, #81084d, rgba(129, 8, 77, 0.5))", // Faded color gradient
    transition: "background-color 0.3s ease", // Smooth transition on hover
    position: "relative",
  },

  fontFamily: [
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    "Roboto",
    '"Helvetica Neue"',
    "Arial",
    "sans-serif",
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(","),
  "&:focus": {
    // background: "linear-gradient(to top, #81084d, rgba(129, 8, 77, 0.5))",
    // transition: "background-color 0.3s ease",
    // position: "relative",
    // content: '""',
    // display: "block",
    // borderBottom: "2px solid #e7e2fd",
  },
  "&:hover::after": {
    // content: '""',
    // display: "block",
    // borderBottom: "2px solid #e7e2fd",
    // position: "absolute",
    // left: 0,
    // right: 0,
    // bottom: 0,
  },
}));

const Navbar = () => {
  const routeNames = ["/", "/aboutus", "/venues"];
  const [activeRoute, setActiveRoute] = useState("/");
  const location = useLocation();

  useEffect(() => {
    setActiveRoute(location.pathname);
  }, [location]);
  return (
    <>
      <div id="nav-logo">
        <img src="src\assets\images\BookMySpaceNew.png" />
      </div>
      <div id="nav-container">
        {/* <div id="nav-logo">
        <img src="src\assets\images\BookMySpaceNew.png" />
      </div> */}
        <div>
          <SearchBox />
        </div>
        <div id="nav-options">
          <ColorButton
            className={activeRoute === "/" ? "active-button" : ""}
            size="medium"
            sx={{ marginRight: "0.4rem" }}
          >
            <Link to="/" className="decorationNone">
              Home
            </Link>
          </ColorButton>
          <ColorButton size="medium" sx={{ marginRight: "0.4rem" }}>
            {/* <Link to="/aboutus" className="decorationNone"> */}
            About Us
            {/* </Link> */}
          </ColorButton>
          <ColorButton
            className={activeRoute === "/venues" || activeRoute==="/venuedetails" ? "active-button" : ""}
            size="medium"
            sx={{ marginRight: "0.4rem" }}
          >
            <Link to="/venues" className="decorationNone">
              Venue
            </Link>
          </ColorButton>
          <ColorButton
            sx={{ marginRight: "0.4rem" }}
            size="medium"
            className={activeRoute === "/photographer" || activeRoute==="/photodetails" ? "active-button" : ""}
          >
            <Link to="/photographer" className="decorationNone">
              Photographers
            </Link>
          </ColorButton>
          <ColorButton sx={{ marginRight: "0.4rem" }} size="medium">
            Catering
          </ColorButton>
          <ColorButton sx={{ marginRight: "0.4rem" }} size="medium">
            Decorator
          </ColorButton>
          <ColorButton sx={{ marginRight: "0.4rem" }} size="medium">
            SingUP
          </ColorButton>
          {/* <Avatar {...stringAvatar("Kent Dodds")} /> */}
          {/* <StyledBadge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          variant="dot"
          sx={{ padding: "0 1rem 0" }}
        >
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </StyledBadge> */}
        </div>
      </div>
    </>
  );
};

export default Navbar;
