import React from 'react';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { FaQuestionCircle } from 'react-icons/fa';
import { Box, Grid } from '@mui/material';
import { FaCanadianMapleLeaf, FaCity } from "react-icons/fa";
import { MdFilterVintage } from "react-icons/md";
import { BsSunglasses } from "react-icons/bs";
import { PiMaskHappyFill } from "react-icons/pi";
import { GiAbstract061 } from "react-icons/gi";

function PhotographyInfo() {
  const pastelColors = ['#FFC3A0', '#A0FFC3', '#FFA0F3', '#A0F3FF', '#FFDA79', '#79FFDA'];

  return (
    <div style={{ marginTop: '50px', padding: '30px', backgroundColor: '#f9f9f9', display: 'flex' }}>
      <div style={{ width: '60%' }}>
        <Box p={2}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Discover Your Style
        </Typography>
        <Typography variant="body1" gutterBottom>
          Before reaching out to wedding photographers, determine your photography style preferences. (Here are the wedding photography styles you should definitely know about.) Browse lots of real wedding photos and look for images that really speak to you. Do you love classical poses? Are you drawn to fun, real-life shots? Do you prefer artistic, experimental photography? Once you get a sense of what type of photography speaks to you, it’s time to start searching.
        </Typography>
        </Box>
     
        <Divider style={{ margin: '30px 0' }} />

        <Box p={2}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Start Your Search
        </Typography>
        <Typography variant="body1" gutterBottom>
          Use a trusted wedding website to find wedding photographers in your area. Start by reviewing their portfolios and checking out their social media feeds to find their most recent work. See if their style resonates with you and if they’ve done weddings that are similar to yours.
        </Typography>
        </Box>

      <Divider style={{ margin: '30px 0' }} />

        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Styles We Specialize
        </Typography>
        <Grid container spacing={2} >
          {[
            { name: 'Modern', icon: <GiAbstract061 />, color: pastelColors[0] },
            { name: 'Vintage', icon: <MdFilterVintage />, color: pastelColors[1] },
            { name: 'Fashion', icon: <BsSunglasses />, color: pastelColors[2] },
            { name: 'Natural', icon: <FaCanadianMapleLeaf />, color: pastelColors[3] },
            { name: 'Urban', icon: <FaCity />, color: pastelColors[4] },
            { name: 'Dynamic', icon: <PiMaskHappyFill />, color: pastelColors[5] }
          ].map((style, index) => (
            <Grid item xs={4} key={index}>
              <Box display="flex" alignItems="center" justifyContent="center" border="1px solid #ccc" p={4} m={2} borderRadius={5} style={{ backgroundColor: style.color }}>
                <Box mr={1} size={1}>{style.icon}</Box>
                <Typography >{style.name}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </div>
      <div style={{ width: '40%', backgroundColor: 'lightblue', padding: '30px', color: 'white', borderRadius: "20px" }}>
        <Typography variant="h4" gutterBottom>
          FAQ
        </Typography>
        <div style={{ margin: '20px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <FaQuestionCircle size={24} style={{ marginRight: '10px', color: '#FF8C00' }} />
            <Typography variant="body1" gutterBottom style={{ fontWeight: 'bold' }}>
              What equipment do you use for photography?
            </Typography>
          </div>
          <Typography variant="body1" gutterBottom>
            We use professional-grade cameras and lenses to ensure high-quality images.
          </Typography>
        </div>
        <div style={{ margin: '20px 0' }}>
           <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
             <FaQuestionCircle size={24} style={{ marginRight: '10px', color: '#FF69B4' }} />
             <Typography variant="body1" gutterBottom style={{ fontWeight: 'bold' }}>
               Can we request specific poses or shots?
             </Typography>
           </div>
           <Typography variant="body1" gutterBottom>
             Absolutely! We welcome your input and will work with you to capture the shots you desire.
           </Typography>
         </div>
         <div style={{ margin: '20px 0' }}>
           <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
             <FaQuestionCircle size={24} style={{ marginRight: '10px', color: '#008000' }} />
             <Typography variant="body1" gutterBottom style={{ fontWeight: 'bold' }}>
               Do you offer videography services as well?
             </Typography>
           </div>
           <Typography variant="body1" gutterBottom>
             Yes, we offer both photography and videography services for various events.
           </Typography>
         </div>
     <div style={{ margin: '20px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
           <FaQuestionCircle size={24} style={{ marginRight: '10px', color: '#800080' }} />
          <Typography variant="body1" gutterBottom style={{ fontWeight: 'bold' }}>
            Are there any additional fees for travel?
          </Typography>
          </div>
         <Typography variant="body1" gutterBottom>
            Additional travel fees may apply depending on the location of the event. Please contact us for more details.
          </Typography>
    </div>
      <div style={{ margin: '20px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
           <FaQuestionCircle size={24} style={{ marginRight: '10px', color: '#00080' }} />
             <Typography variant="body1" gutterBottom style={{ fontWeight: 'bold' }}>
               How soon in advance should we book your photographers?
            </Typography>
           </div>
        <Typography variant="body1" gutterBottom>
      It is recommended to book our services at least 6-12 months in advance to secure your desired date.
       </Typography>
      </div>
      </div>

     
    </div>
  );
}

export default PhotographyInfo;


