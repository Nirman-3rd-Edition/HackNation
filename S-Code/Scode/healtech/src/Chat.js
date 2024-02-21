import React from "react";
import "./Chat.css";

import {IconButton} from "@mui/material";
import {SearchOutlined,NotificationAdd,MoreVert}from "@mui/icons-material";

function Chat() {
   
  return (
    <div className="chat">
    <div className="chat__header">
        
        


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
            <div className="chat_body" >
        
    </div>
 </div>
  );
}


export default Chat;
