import React from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import Slider from "react-slick";
import { FaRegHeart } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../styles/navbar.css'
import photographersData from "../assets/data/photographers.json";
import { Link } from "react-router-dom";
// import { TbPigMoney } from "react-icons/tb";

function PhotographerCards() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div style={{ margin: "6%" }}>
      <Grid container spacing={3}>
        {photographersData.map((photographer) => (
          <Grid item xs={12} sm={6} md={4} key={photographer.id} p={3}>
            <div style={{ position: "relative" }}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Slider {...settings}>
                  {photographer.photos.map((photo, index) => (
                    <img
                      key={index}
                      src={photo}
                      alt={`Photo ${index + 1}`}
                      style={{
                        width: "100%",
                        maxHeight: "200px",
                        objectFit: "cover",
                      }}
                    />
                  ))}
                </Slider>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography
                    gutterBottom
                    variant="h5"
                    sx={{ fontWeight: "bold" }}
                  >
                    {photographer.username}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Style:</strong> {photographer.style}
                    <br />
                    <strong>Experience Years:</strong>{" "}
                    {photographer.experienceYears}
                    <br />
                    <strong>Status:</strong>{" "}
                    {photographer.availability[0].status}
                    <br />
                    <strong>Availability:</strong>{" "}
                    {photographer.availability[0].date}
                    <br />
                    {/* <TbPigMoney size={20} color="pink"/>
                    <strong>Price:</strong> {photographer.pricing} */}
                  </Typography>
                </CardContent>
                <Button variant="contained" sx={{ m: 2 }}>
                <Link to="/photodetails" className="decorationNone">
                  Request Pricing
                  </Link>
                </Button>
              </Card>
              <div style={{ position: "absolute", top: "10px", right: "10px" }}>
                <FaRegHeart size={24} />
              </div>
            </div>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default PhotographerCards;
