import React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import LocalPostOfficeRoundedIcon from "@mui/icons-material/LocalPostOfficeRounded";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Container } from "@mui/material";

const FooterNew = () => {
  const email = "venue_menu@info.com";

  const texts = [
    "Partner Login",
    "FAQ",
    "Terms & Conditions",
    "Privacy Policy",
    "Testimonials",
    "Responsible Disclosure",
    "List Your Business",
    "Deals",
    "Help",
    "Upcomings",
  ];
  return (
    <Container
      sx={{ position: "static", bottom: "0", left: "0", right: "0" }}
      disableGutters="true"
      maxWidth="xl"
    >
      <Box sx={{ position: "static", bottom: "0", left: "0", right: "0" }}>
        <BottomNavigation
          showLabels
          //   style={{ width: "100%" }}
          sx={{
            textAlign: "center",
            width: "100%",
            displa: "flex",
            justifyContent: "space-around",
            alignContent: "center",
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          {texts.map((text, index) => (
            <BottomNavigationAction key={index} label={text} />
          ))}
        </BottomNavigation>
        <Box
          sx={{
            padding: "20px",
            textAlign: "center",
            backgroundColor: "#181626",
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={8} sm={4} md={4} lg={4} xl={4}>
              <Box sx={{ p: 2 }}>
                <img
                  src="src/assets/images/BookMySpace.png"
                  alt="Company Logo"
                  style={{
                    height: "7rem",
                    width: "10rem",
                    marginRight: "40px",
                  }}
                />
                <Typography variant="h6">
                  <Link
                    href={`mailto:${email}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <LocalPostOfficeRoundedIcon
                      fontSize="medium"
                      style={{ verticalAlign: "middle", marginRight: "8px" }}
                    />
                    book_myspace@info.com
                  </Link>
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={8} sm={4} md={4} lg={4} xl={4}>
              <Box sx={{ p: 2 }}>
                <Typography variant="h6">FOLLOW US</Typography>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  mt={2}
                >
                  <Link
                    href="www.facebook.com"
                    sx={{ textDecoration: "none", color: "#0866ff" }}
                  >
                    <FacebookIcon fontSize="large" sx={{ mx: 1 }} />
                  </Link>
                  <Link
                    href="www.twitter.com"
                    sx={{ textDecoration: "none", color: "inherit" }}
                  >
                    <TwitterIcon fontSize="large" sx={{ mx: 1 }} />
                  </Link>
                  <Link
                    href="www.instagram.com"
                    sx={{ textDecoration: "none", color: "#E1306C" }}
                  >
                    <InstagramIcon fontSize="large" sx={{ mx: 1 }} />
                  </Link>
                  <Link
                    href="www.youtube.com"
                    sx={{ textDecoration: "none", color: "red" }}
                  >
                    <YouTubeIcon fontSize="large" sx={{ mx: 1 }} />
                  </Link>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={8} sm={4} md={4} lg={4} xl={4}>
              <Box style={{ height: "100%" }} sx={{ p: 2 }}>
                <Typography variant="h6">PAYMENT</Typography>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  mt={2}
                >
                  <img
                    src="src/assets/images/visa.png"
                    alt="visa"
                    style={{ height: "40px", marginRight: "10px" }}
                  />
                  <img
                    src="src/assets/images/logo.png"
                    alt="paypal"
                    style={{ height: "40px", marginRight: "10px" }}
                  />
                  <img
                    src="src/assets/images/american-express.png"
                    alt="american-express"
                    style={{ height: "40px", marginRight: "10px" }}
                  />
                  <img
                    src="src/assets/images/maestro.png"
                    alt="maestro"
                    style={{ height: "40px", marginRight: "10px" }}
                  />
                </Box>
              </Box>
            </Grid>
          </Grid>
          <Typography variant="body2" color="secondary">
            © 2024 BookMySpace. All rights reserved.
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default FooterNew;
