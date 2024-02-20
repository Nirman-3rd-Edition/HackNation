import React, { useState, useEffect } from "react";
import { Box, Typography, Grid } from "@mui/material";
import { MobileStepper } from "@mui/material";
import "./compo2.css";



const DotsMobileStepper = ({ imagesLength, activeStep }) => {
  return (
    <MobileStepper
      variant="dots"
      steps={imagesLength}
      position="static"
      activeStep={activeStep}
      sx={{ maxWidth: 400, flexGrow: 1, margin: "auto" }}
    />
  );
};

const AtAGlance = ({ imagesWithDescriptions }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) =>
        prevIndex === imagesWithDescriptions.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Change images every 3 seconds

    return () => clearInterval(interval);
  }, [imagesWithDescriptions.length]);

  return (
    <Box width="100%" bgcolor="#0c091a" marginTop={6}  >
      <Grid container spacing={1}>
        <Grid item xs={12} md={8}>
          <Box
            position="relative"
            width="100%"
            height="100%"
            display="flex"
            flexDirection="column"
            className="image-container"
          >
            <img
              src={imagesWithDescriptions[activeIndex].img}
              alt={`Image ${activeIndex + 1}`}
              style={{ width: "100%", height: "40rem", objectFit: "fill" }}
              className="image"
            />
            <DotsMobileStepper
              imagesLength={imagesWithDescriptions.length}
              activeStep={activeIndex}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box
            // p={2}
            bgcolor="rgba(255, 255, 255, 0.7)"
            height="96%"
            maxHeight="100%"
            width="100%"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            className="text-container"
          >
            <Typography variant="h2" sx={{ padding: "1.3rem" }}>
              {imagesWithDescriptions[activeIndex].title}
            </Typography>
            <Typography
              variant="body1"
              align="justify"
              sx={{ padding: "1rem" }}
            >
              {imagesWithDescriptions[activeIndex].description}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AtAGlance;
