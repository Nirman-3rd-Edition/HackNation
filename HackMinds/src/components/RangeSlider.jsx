import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import MuiInput from "@mui/material/Input";
import VolumeUp from "@mui/icons-material/VolumeUp";
import CurrencyRupeeOutlinedIcon from "@mui/icons-material/CurrencyRupeeOutlined";

const Input = styled(MuiInput)`
  width: 80px;
`;

export default function InputSlider() {
  const [value, setValue] = React.useState(500000);

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleInputChange = (event) => {
    setValue(event.target.value === "" ? 0 : Number(event.target.value));
  };

  const handleBlur = () => {
    if (value < 0) {
      setValue(0);
    } else if (value > 500000) {
      setValue(500000);
    }
  };

  return (
    <Box sx={{ width: 300 }}>
      <Typography id="input-slider" gutterBottom align="center">
        Select Budget
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <CurrencyRupeeOutlinedIcon sx={{ color: "#C00C21" }} />
        </Grid>
        <Grid item xs>
          <Slider
            value={typeof value === "number" ? value : 0}
            onChange={handleSliderChange}
            color="accent"
            aria-labelledby="input-slider"
            min={100000}
            max={500000}
            valueLabelDisplay="auto"
          />
        </Grid>
        <Grid item>
          <Input
            value={value}
            size="small"
            onChange={handleInputChange}
            onBlur={handleBlur}
            inputProps={{
              step: 100000,
              min: 100000,
              max: 500000,
              type: "number",
              "aria-labelledby": "input-slider",
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
