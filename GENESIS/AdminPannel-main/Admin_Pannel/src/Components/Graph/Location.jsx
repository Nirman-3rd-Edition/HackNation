import React, { useState, useEffect } from 'react';

const CurrentLocation = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [address, setAddress] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
            
            try {
              const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${position.coords.latitude}+${position.coords.longitude}&key=17c31206576f461787e4ed1f88a10b68`);
              const data = await response.json();
              if (data.results.length > 0) {
                setAddress(data.results[0].formatted);
              } else {
                setAddress('Location not found');
              }
            } catch (error) {
              setAddress('Error fetching location');
            }
          },
          (error) => {
            setError(error.message);
          }
        );
      } else {
        setError("Geolocation is not supported by this browser.");
      }
    };

    getLocation();
  }, []); // Empty dependency array ensures useEffect runs only once

  return (
    <div style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
      {error ? (
        <p>Error: {error}</p>
      ) : (
        address
      )}
    </div>
  );
};

export default CurrentLocation;
