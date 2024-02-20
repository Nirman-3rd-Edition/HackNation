import { Autocomplete, Stack, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./searchbox.css";



const SearchBox = () => {

    const [suggestions, setSuggesstions] = useState([]);


    useEffect(() => {
        fetch("http://localhost:5500/venue",{
            method:"GET",

        })
        .then((res) => res.json())
        .then((data) => {
            setSuggesstions(data);
            localStorage.setItem("data",data);
        })
    }, []);

    return (
      <div id="box">
        <Autocomplete
          id="search-box"
          disableClearable
          options={suggestions.slice(0, 4).map((option) => option.name)}
          renderInput={(params) => (
            <TextField id="text-field"
              {...params}
              label="Search Venues"
              InputProps={{
                ...params.InputProps,
                type: 'search',
              }}
            />
          )}
        />
      </div>
    );
  }
  export default SearchBox;