import React from "react";
import "./Chat.css";
import { IconButton } from "@mui/material";
import { NotificationAdd, MoreVert, SearchOutlined } from "@mui/icons-material";

function Chat() {
  return ( 
  <div className="chat">
    <div className="chat__header">
        
        <div className="chat__headerInfo">
            <button><h2>About Us</h2></button>
         </div>

        <div className="chat__headerInfo">
            <button><h2>Clubs</h2></button>
        </div>

        <div className="chat__headerInfo">
            <button><h2>Updates</h2></button>
         </div>

        <div className="chat__headerInfo">
            <button><h2>Activity</h2></button>
        </div>


        <div className="chat__headerRight">
            <IconButton>
                <SearchOutlined/>
            </IconButton>
            <IconButton>
                <NotificationAdd/>
            </IconButton>
            <IconButton>
                <MoreVert/>
            </IconButton>
        </div>
    </div>
 </div>
  );
}

export default Chat
