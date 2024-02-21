import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function GuestPicker() {
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <div>
      <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-filled-label">Guests</InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={age}
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Less Than 100</MenuItem>
          <MenuItem value={20}>100-200</MenuItem>
          <MenuItem value={30}>200-300</MenuItem>
          <MenuItem value={30}>300-400</MenuItem>
          <MenuItem value={30}>400-500</MenuItem>
          <MenuItem value={30}>Greater Than 500</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
