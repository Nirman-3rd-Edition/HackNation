import React from 'react';
import Header from "../Components/Header";
import Footer from "../Components/Footer";


const Profile = () => {
  return (
    <>
    <Header />
    <div>
      <div className='profile'>
        <div className='profile__image'>
          <img style={{width:"160px", height: "160px", borderRadius:"80px"}} src="https://www.pixelstalk.net/wp-content/uploads/images6/Farm-Wallpaper-HD-Free-download.jpg" alt='img'/></div>
      <div>
        <h4>  Umesh Kesaria</h4> 
        <div style = {{display: "flex"}}>
          <h6>4 Posts</h6>
          </div>
        </div>
      </div>
   </div>
    <Footer />
    </>
  );
};

export default Profile;