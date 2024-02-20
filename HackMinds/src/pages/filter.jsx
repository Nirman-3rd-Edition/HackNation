import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { FaFilter } from 'react-icons/fa';
import PhotographerCard from './photographerCard'; 
import photographersData from './photographers.json';

function FilterButton() {
  const [open, setOpen] = useState(false);
  const [selectedPriceRange, setSelectedPriceRange] = useState('');
  const [selectedStyles, setSelectedStyles] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [filteredPhotographers, setFilteredPhotographers] = useState([]);

  const styles = Array.from(new Set(photographersData.map(photographer => photographer.style)));

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handlePriceRangeChange = (event) => {
    setSelectedPriceRange(event.target.value);
  };

  const handleStyleChange = (style) => {
    const index = selectedStyles.indexOf(style);
    if (index === -1) {
      setSelectedStyles([...selectedStyles, style]);
    } else {
      const updatedStyles = [...selectedStyles];
      updatedStyles.splice(index, 1);
      setSelectedStyles(updatedStyles);
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const applyFilters = () => {
    let filteredPhotographers = photographersData;

    if (selectedPriceRange) {
      const [minPrice, maxPrice] = selectedPriceRange.split('-');
      filteredPhotographers = filteredPhotographers.filter(
        (photographer) =>
          photographer.pricing >= parseInt(minPrice) && photographer.pricing <= parseInt(maxPrice)
      );
    }

    if (selectedDate) {
      const selectedDateString = selectedDate.toLocaleDateString();
      filteredPhotographers = filteredPhotographers.filter((photographer) =>
        photographer.availability.includes(selectedDateString)
      );
    }

    if (selectedStyles.length > 0) {
      filteredPhotographers = filteredPhotographers.filter((photographer) =>
        selectedStyles.includes(photographer.style)
      );
    }

    setFilteredPhotographers(filteredPhotographers);
    setOpen(false);
  };

  return (
    <>
      <Button onClick={toggleDrawer} variant="contained" color="primary" startIcon={<FaFilter />}>
        FILTER
      </Button>
      <Drawer anchor="right" open={open} onClose={toggleDrawer}>
        <div style={{ width: '250px', padding: '20px' }}>
          <h2>Filters</h2>
          <FormControl fullWidth sx={{ marginBottom: '20px' }}>
            <Select
              value={selectedPriceRange}
              onChange={handlePriceRangeChange}
              displayEmpty
              inputProps={{ 'aria-label': 'Select Price Range' }}
            >
              <MenuItem value="">All Prices</MenuItem>
              <MenuItem value="0-10000">Less than ₹10,000</MenuItem>
              <MenuItem value="10000-20000">₹10,000 - ₹20,000</MenuItem>
              <MenuItem value="20000-30000">₹20,000 - ₹30,000</MenuItem>
              <MenuItem value="30000-40000">₹30,000 - ₹40,000</MenuItem>
            </Select>
          </FormControl>
          <div style={{ marginBottom: '20px' }}>
            <TextField
              id="date"
              label="Availability"
              type="date"
              value={selectedDate ? selectedDate.toISOString().split('T')[0] : ''}
              onChange={(e) => handleDateChange(new Date(e.target.value))}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          <div style={{ marginBottom: '20px', margin:"10px"}}>
            <FormControl component="fieldset">
              <legend><b>Style</b></legend>
              {styles.map(style => (
                <FormControlLabel
                  key={style}
                  control={<Checkbox checked={selectedStyles.includes(style)} onChange={() => handleStyleChange(style)} />}
                  label={style}
                />
              ))}
            </FormControl>
          </div>
          <div style={{ marginTop: '20px', textAlign: 'center' }}>
            <Button onClick={applyFilters} variant="contained" color="primary">
              Apply Filters
            </Button>
          </div>
        </div>
      </Drawer>
      <div className="photographer-list">
        {filteredPhotographers.length > 0 &&
          filteredPhotographers.map((photographer) => (
            <PhotographerCard key={photographer.id} photographer={photographer} />
          ))}
      </div>
    </>
  );
}

export default FilterButton;
