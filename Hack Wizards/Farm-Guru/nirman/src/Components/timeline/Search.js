import React, { useState } from 'react'
import "./Search.css";
import SearchIcon from '@mui/icons-material/Search';

function Search() {
 const[searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
 setSearchTerm(event.target.value);  };

  return (
    <div className='Search'>
      <div className='SearchCard'>
      <h3>Find your Friend!</h3>
      <div className='Searchbar'>
        
        {/* <input type='text' value={searchTerm}  onChange={handleSearch} placeholder="Search Here"/> */}
        <input type='text' value={searchTerm} onChange={handleSearch} placeholder="Search Here" /> <button className='search-button mx-2' onClick={handleSearch}><SearchIcon />
        </button> 
        {/* <button className='search-button' onClick={handleSearch}><SearchIcon icon={SearchIcon} /></button> */}
         </div>
      </div>
      <div className='SearchCard'>
      <div className='SearchResults'>
       <h3> Search Results: </h3>{searchTerm}
      </div>
    </div>
    </div>
  );
}

export default Search;