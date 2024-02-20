import React from "react";
import PrimarySearchAppBar from "../PrimarySearchAppBar";
import { Box } from "@mui/material";

function VenueCard() {
  return (
    <Box sx={{ position: "relative", left: 0, right: 0 }}>
      <PrimarySearchAppBar />
      {/* <Cards /> */}
    </Box>
  );
}

export default VenueCard;
