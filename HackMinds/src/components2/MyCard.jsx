import * as React from "react";
import Slider from "react-slick";
import CardActions from "@mui/material/CardActions";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import { FaUsers, FaHeart } from "react-icons/fa";
import Button from "@mui/material/Button";
import "./slick-custom.css";
import { CardContent, Card, Typography } from "@mui/material";
import Container from "@mui/material/Container";
import Data from "../assets/data/data.json";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function MyCard() {
  // Carousel Controls
  const settings = {
    dots: false,
    centerMode: true,
    centerPadding: "10px",
    autoplay:true,
    infinite: true,
    speed: 700,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
    arrows: true,
  };

  return (
    <Container maxWidth="xl" style={{ marginTop: "5%" }}>
      <Slider {...settings}>
        {Data.venues.map((result, index) => (
          <Card key={index} sx={{ maxWidth: 345, padding: "10px" }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="200" //140
                image={result.imageLink}
                alt="Venue Image"
                style={{ borderRadius: "5px" }}
              />
              <FaHeart
                className="wishlist"
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  color: "red",
                  fontSize: "2em",
                }}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  <span className="loc">{result.location}</span>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <span className="occasion">Occasion: {result.occasion}</span>
                  <br />
                  <FaUsers className="user_icon" />
                  <span className="capacity"> {result.capacity}</span>
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions style={{ justifyContent: "center" }}>
              <Button size="small" variant="contained" className="buttons">
                See Prices
              </Button>
              <Button size="small" variant="contained" className="buttons">
                Venue Tour
              </Button>
            </CardActions>
          </Card>
        ))}
      </Slider>
    </Container>
  );
}

export default MyCard;
