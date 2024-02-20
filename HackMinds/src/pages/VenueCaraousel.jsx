import React,{ useState } from 'react';
import Box from '@mui/system/Box';
// import { useState } from 'react';
import Container from '@mui/system/Container';
import Grid from '@mui/material/Grid';
import Slider from 'react-slick';
import data2 from '../assets/data/data2.json'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../styles/imageslider.css';
import vegnonvegimage from '../assets/images/vegnonveg.png';
import foodpackages from '../assets/images/foodpackages.png';
import rightcarddesc2 from '../assets/images/rightcarddesc2.avif'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Chip } from '@mui/material';
import { outlinedInputClasses } from '@mui/material/OutlinedInput';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';

const VenueCaraousel = (props) => {
  const [venueId, setVenueId] = useState("The_Presidency");
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const venue = data2.find(item => item.id === venueId);

  if (!venue) {
    return <div>No venue found for the given ID</div>;
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };
  
  const handleTimeChange = (e) => {
    setTime(e.target.value);
  };

  const handleSubmit = () => {
    console.log('Date:', date);
    console.log('Time:', time);
  };



  


  return (
    <Box className="carousel">
      <Box className="venue-carousel">
        <Slider {...settings}>
          {venue.photos.map(photo => (
            <div key={photo} className="slide">
              <img src={photo} alt={venue.venueName} />
            </div>
          ))}
        </Slider>

      <Grid container spacing={2} columns={16}>
        <Grid item xs={8}>
        <Box component="section" className="desc1" sx={{ p: 2}} borderRadius={2} marginBottom={2}>
          <h2>{venue.venueName}</h2>
          <h4>{venue.location}</h4>
        </Box>
        {venue.venueType.map(t=>(   
          <div className="desc2">
            <Chip label={t} clickable/>
          </div>
        ))}
        <Box className="desc4" sx={{ p: 2 }} borderRadius={2} marginBottom={2} marginTop={2}>
        <h2>About This Venue</h2>
          <p>The Presidency, Bhubaneswar, Nayapalli, is one of the finest, star-rated boutique hotels in the city, offering high-quality services, top-notch amenities, and a perfect backdrop for celebrations of any kind.</p>
          <h2>How to reach The Presidency</h2>
          <p>Being located in the heart of the city, off the Katikata-Jaipur Road, The Presidency Banquet Hall Bhubaneswar about 20 mins from Biju Patnaik International Airport as well as Bhubaneswar Station, makes it easily accessible by using both public and private transportation.</p>
          <h2>Party areas available at The Presidency</h2>
          <p>Hotel Presidency, Bhubaneswar Banquets sports multiple halls of small to mid-sized capacities that are perfect for social and corporate events. </p>
          <h2>Events at the Presidency</h2>
          <p>At The Presidency, Nayapalli, Bhubaneswar, one can host weddings, receptions, and pre-wedding ceremonies such as sangeet, haldi, mehndi, also ideal for birthdays, anniversaries, conferences, seminars, team-building events, expos, and a lot more.</p>
          <h2>Services Offered</h2>
          <p>At The Presidency, Nayapalli, Bhubaneswar, your guests will be treated to a wide variety of vegetarian and non-vegetarian dishes. To the delight of your guests, you may add alcoholic beverages to the menu as well. Moreover, you have the liberty to bring outside liquor here. The in-house decor team will up the charm of the halls and ultimately your events. The highly-trained staff here will ensure that your overall experience is a smooth-sailing by looking after everything that's needed. The Presidency Wedding is sure to be a lit one! With marble floors, contrasting color schemes, and a beautifully illuminated ceiling, the function halls portray a magnificent and regal image.</p>
          <h2>Facilities available</h2>
          <p>The Presidency Classic Hotel Bhubaneswar offers plenty of luxurious rooms to accommodate your guests. A large parking space plus valet are the added perks that you can avail of. If you wish to have an overnight wedding, this hotel lets you have one. To add more to your advantage, there are a couple of air-conditioned complimentary changing rooms available here for the bride and the groom so they can put up their best appearances.Book The Presidency, Bhubaneswar, Odisha, for your upcoming event and make your big day memorable!</p>

        </Box>
        

      
        </Grid>
        <Grid item xs={2}>
        <Box className="desc3" sx={{ p: 2, }}>
          {/* <img src={vegnonvegimage} alt="veg non-veg" /> */}
          <Card sx={{width:400,border:"1px solid black"}} >
            <CardMedia
              component="img"
              alt="green iguana"
              height="140"
              width="500"
              style={{ objectFit: 'cover', width: '100%', height: '100%' }}
              image={vegnonvegimage}
            />
            <CardContent>
            </CardContent>
            <CardActions sx={{display:"flex",justifyContent:"space-around"}}>
              <Button sx={{color:"white",border:"1px solid red",backgroundColor:"red"}} size="small">See Prices</Button>
              <Button sx={{color:"red",border:"1px solid red",backgroundColor:"",}} size="small">Venue Tour</Button>
            </CardActions>
            <CardMedia
              component="img"
              alt="green iguana"
              height="140"
              width="500"
              style={{ objectFit: 'cover', width: '100%', height: '80%' }}
              image={rightcarddesc2}
            />

          </Card>
        </Box>

        </Grid>
      </Grid>
      <Box sx={{backgroundColor:'	#E0E0E0',color:'black',p:2}}>
          <h2>Get Virtual Tour</h2>
          <h3>Get guided tour of the Venue by our Venue Managers over Video Call at comfort of your home.</h3>
          <Box
            component="form"
            sx={{
              '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField label="Visit Date" type="date" color="secondary" sx={{height:50}} focused />
            <TextField label="Visit Time" type="time" color="secondary" sx={{height:50}} focused />
            <Button type="submit" variant="outlined" color="secondary" sx={{height:55, fontSize:16, fontWeight:500}}>Submit</Button>
          </Box>          

        </Box>
      <Box className="desc5" sx={{ p: 2 }}>
          <img src={foodpackages} alt="foodpackages" />
        </Box>
      </Box>
    </Box>
  );
}

export default VenueCaraousel;

