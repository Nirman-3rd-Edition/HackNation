import React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import XIcon from "@mui/icons-material/X";
import YouTubeIcon from "@mui/icons-material/YouTube";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import Divider from "@mui/material/Divider";
import Box from "@mui/system/Box";
import Link from "@mui/material/Link";
import { Container } from "@mui/material";
import Grid from "@mui/material/Grid";
import LocalPostOfficeRoundedIcon from "@mui/icons-material/LocalPostOfficeRounded";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";

function Footer() {
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
    <>
      <Container
        sx={{ position: "relative" }}
        maxWidth="xl"
        disableGutters={true}
      >
        <Paper
          style={{
            width: "100%",
            textAlign: "center",
          }}
          elevation={3}
        >
          <Box sx={{ padding: "0 0 20px" }}>
            <Box>
              <BottomNavigation
                showLabels
                sx={{
                  width: "100%",
                  color: "#ffffff",
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  overflow: "auto",
                }}
              >
                {texts.map((text, index) => (
                  <BottomNavigationAction
                    key={index}
                    label={text}
                    sx={{ fontWeight: "bolder" }}
                  />
                ))}
              </BottomNavigation>
            </Box>
            <Grid container spacing={2}>
              {/* First Box */}
              <Grid item xs={8} sm={4} md={4} lg={4} xl={4}>
                <Box style={{ height: "100%" }} sx={{ p: 2 }}>
                  <img
                    src="src/assets/images/BookMySpaceNew.png"
                    alt="Company Logo"
                    style={{
                      height: "7rem",
                      width: "14rem",
                      marginRight: "40px",
                      backgroundColor: "transparent",
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

              {/* Second Box */}
              <Grid item xs={8} sm={4} md={4} lg={4} xl={4}>
                <Box style={{ height: "100%" }} sx={{ p: 2 }}>
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: "bolder", color: "#e8e5f6" }}
                  >
                    FOLLOW US
                  </Typography>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    mt={2}
                  >
                    <Link
                      href="www.facebook.com"
                      sx={{ textDecoration: "none", color: "inherit" }}
                    >
                      <FacebookIcon fontSize="large" sx={{ mx: 1 }} />
                    </Link>
                    <Link
                      href="www.twitter.com"
                      sx={{ textDecoration: "none", color: "inherit" }}
                    >
                      <XIcon fontSize="large" sx={{ mx: 1 }} />
                    </Link>
                    <Link
                      href="www.instagram.com"
                      sx={{ textDecoration: "none", color: "inherit" }}
                    >
                      <InstagramIcon fontSize="large" sx={{ mx: 1 }} />
                    </Link>
                    <Link
                      href="www.youtube.com"
                      sx={{ textDecoration: "none", color: "inherit" }}
                    >
                      <YouTubeIcon fontSize="large" sx={{ mx: 1 }} />
                    </Link>
                  </Box>
                </Box>
              </Grid>

              {/* Third Box */}
              <Grid item xs={8} sm={4} md={4} lg={4} xl={4}>
                <Box style={{ height: "100%" }} sx={{ p: 2 }}>
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: "bolder", color: "#e8e5f6" }}
                  >
                    PAYMENT
                  </Typography>
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

            <Divider
              style={{
                margin: "20px 0",
                backgroundColor: "#aeafbd",
                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
              }}
            />
            <Typography variant="body2" color="secondary">
              © 2024 BookMySpace. All rights reserved.
            </Typography>
          </Box>
        </Paper>
      </Container>
    </>
  );
}
export default Footer;
