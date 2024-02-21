import { createTheme } from "@mui/material";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#3611EE",
    },
    secondary: {
      main: "#81084D",
    },
    accent: {
      main: "#C00C21",
    },
    background: {
      default: "#040113",
      paper: "#0c091a",
      // "#0c091a",
    },
    text: {
      // primary:"#24327d",
      primary: "#E7E2FD",
      secondary: "#B0B0B0",
    },
  },
});

export default darkTheme;
