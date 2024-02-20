import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import SelectOptions from "./components/SelectOptions";
import DateTime from "./components/DateTime";
import { Typography, colors } from "@mui/material";
import darkTheme from "./assets/themes/darkTheme";
import GuestPicker from "./components/GuestPIcker";
import MultipleSelectCheckmarks from "./components/MultipleSelectCheckMarks";
import RangeSlider from "./components/RangeSlider";
import { IconButton } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import Cards from "./components/Cards";
import Footer from "./Footer";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  height: "3rem",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const LocationIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  color: "#C00C21",
  height: "100%",
  position: "absolute",
  left: "70%",
  right: 0,
  top: "50%",
  transform: "translateY(-50%)",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    height: "2rem",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function PrimarySearchAppBar() {
  return (
    <Box
      flexGrow={1}
      id="SearchBar"
      sx={{
        position: "relative",
        left: 0,
        right: 0,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
        justifyContent: "center",
        backgroundColor:"#0c091a",
      }}
    >
      <AppBar position="sticky" sx={{ width: "100%", top: 1 }}>
        <Toolbar sx={{backgroundColor:"#100b25"}}>
          <Search sx={{ backgroundColor: darkTheme.palette.secondary }}>
            <SearchIconWrapper>
              <SearchIcon sx={{ color: "#C00C21" }} />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Searc for venues"
              inputProps={{ "aria-label": "search" }}
            />
            <LocationIconWrapper sx={{ display: { xs: "none", sm: "flex" } }}>
              <MyLocationIcon />
            </LocationIconWrapper>
          </Search>
          <Box sx={{ display: { xs: "none", sm: "flex" } }}>
            <MultipleSelectCheckmarks />
          </Box>
          <Box
            sx={{
              marginLeft: "0.5rem",
              paddingBottom: "0.7rem",
              display: { xs: "none", sm: "flex" },
            }}
          >
            <DateTime />
          </Box>
          <Box sx={{ display: { xs: "none", sm: "none", lg: "flex" } }}>
            <GuestPicker />
          </Box>
          <Box sx={{ display: { xs: "none", sm: "none", lg: "flex" } }}>
            <RangeSlider />
          </Box>
          <Box sx={{ display: { xs: "none", sm: "none", lg: "flex" } }}>
            <IconButton
              aria-label="delete"
              size="large"
              sx={{ backgroundColor: "#C00C21" }}
            >
              <SearchOutlinedIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Cards />
    </Box>
  );
}
