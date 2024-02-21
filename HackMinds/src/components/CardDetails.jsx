import React, { useState } from "react";
import { Typography, Chip, Button, IconButton, Stack } from "@mui/material";
import Rating from "@mui/material/Rating";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import VegIcon from "@mui/icons-material/EmojiFoodBeverage";
import NonVegIcon from "@mui/icons-material/Restaurant";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import Grid from "@mui/material/Grid";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { Link } from "react-router-dom";
import { Paper } from "@mui/material";
import '../styles/navbar.css'

const CardDetails = ({ ...props }) => {
  const services = props.servicesOffered;
  const [expanded, setExpanded] = useState(false);
  const description = props.description;
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    // <Paper elevation={6}>
    <Grid
      container
      direction="row"
      alignItems="center"
      spacing={1}
      rowSpacing={2}
      sx={{
        paddingTop: "4rem",
        paddingBottom: "2rem",
      }}
    >
      <Grid
        item
        xs={12}
        sm={12}
        md={6}
        lg={6}
        xl={6}
        display="flex"
        justifyContent="flex-start"
      >
        <Typography variant="h4">{props.venueName}</Typography>
      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
        md={6}
        lg={6}
        xl={6}
        display="flex"
        justifyContent="flex-end"
      >
        <Rating name="rating" value={4.5} precision={0.5} readOnly />
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <Typography variant="body1" align="left">
          {props.location}
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
        <Chip
          label={`Guests: ${props.capacity}`}
          sx={{ backgroundColor: "#48052b",fontWeight:"bolder" }}
          clickable
        />
      </Grid>
      {services.map((service, index) => (
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          lg={4}
          xl={4}
          key={index}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Chip
            label={service}
            sx={{ backgroundColor: "#48052b",fontWeight:"bolder" }}
            clickable
          />
        </Grid>
      ))}
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <Typography
          gutterBottom={true}
          variant="body2"
          align="justify"
          sx={{ maxWidth: "40rem", maxHeight: "40rem" }}
        >
          {expanded ? description : `${description.slice(0, 100)}...`}
          <IconButton onClick={handleExpandClick}>
            {!expanded ? <ExpandMoreIcon /> : <ExpandLessIcon />}
          </IconButton>
        </Typography>
      </Grid>
      <Grid item xs={12} sm={4} md={6} lg={6} xl={6}>
        <Chip
          label="Price:"
          variant="filled"
          size="medium"
          icon={<CurrencyRupeeIcon />}
          color="success"
          sx={{
            fontWeight: "bold",
          }}
          clickable
        />
        {/* <Typography variant="body1" >
          Price:
        </Typography> */}
      </Grid>
      <Grid item xs={12} sm={4} md={3} lg={3} xl={3}>
        <VegIcon />
        <Typography variant="body1">$100</Typography>
      </Grid>
      <Grid item xs={12} sm={4} md={3} lg={3} xl={3}>
        <NonVegIcon />
        <Typography variant="body1">$120</Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
        <IconButton
          color="primary"
          sx={{ border: "0.4rem solid", borderRadius: "0.6rem" }}
        >
          <VideocamOutlinedIcon fontSize="large" />
        </IconButton>
      </Grid>
      <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
        <Button variant="contained" color="accent">
        <Link to="/venuedetails" className="decorationNone">
          Book Now
          </Link>
        </Button>
      </Grid>
    </Grid>
    // </Paper>
  );
};

export default CardDetails;
