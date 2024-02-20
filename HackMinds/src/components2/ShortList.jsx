import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import './shortlist.css'
import { TextField } from '@mui/material';
function ShortList() {
    const [isLiked, setIsLiked] = useState(false);
    const [icon, setIcon] = useState(<FavoriteBorderIcon />);
  
    const handleLikeClick = () => {
        setIsLiked(prevIsLiked => !prevIsLiked); // Use functional form of setState
        setIcon(prevIcon => (prevIcon.type === FavoriteBorderIcon ? <FavoriteIcon /> : <FavoriteBorderIcon />));
    };
  
    return (
        <div id='shortlist-container' onClick={handleLikeClick}>
            <p>SAVE TO MY SHORTLIST</p>
            <IconButton  aria-label="like" id="heart-icon">
                {icon}
            </IconButton>
        </div>
    );
}

export default ShortList;