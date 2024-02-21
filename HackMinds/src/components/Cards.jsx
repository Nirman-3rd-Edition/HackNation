import React from "react";
import { Paper, Typography, Card, CardContent } from "@mui/material";
import CustomImageList from "./CustomImageList";
import Container from "@mui/material/Container";
import CardDetails from "./CardDetails";
import Grid from "@mui/material/Grid";
import data from "../assets/data/data";

function Cards() {
  return (
    <Container>
      {data.map((venue) => (
        <Paper
          key={venue.id}
          elevation={1}
          sx={{
            position: "relative",
            top: 20,
            left: 150,
            marginBottom: "4rem",
            //right: 100,
          }}
        >
          <Container>
            <Grid
              container
              rowSpacing={{ xs: 1, sm: 1, md: 1 }}
              columnSpacing={{ md: 1, lg: 1 }}
            >
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <CustomImageList photos={venue.photos} />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <CardDetails
                  venueName={venue.venueName}
                  description={venue.description}
                  servicesOffered={venue.servicesOffered}
                  capacity={venue.capacity}
                  location={venue.location}
                />
              </Grid>
            </Grid>
          </Container>
        </Paper>
      ))}
    </Container>
  );
}

export default Cards;
