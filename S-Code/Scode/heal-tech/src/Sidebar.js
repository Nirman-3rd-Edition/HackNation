import React from "react";
import "./Sidebar.css";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import { Avatar,IconButton } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {SearchOutlined} from "@mui/icons-material";
import SidebarChat from "./SidebarChat";
function Sidebar() {
  return( 
     <div className="sidebar">
    <div className="sidebar__header">
     <Avatar src="https://cdn.vectorstock.com/i/1000x1000/01/69/businesswoman-character-avatar-icon-vector-12800169.webp"/>
    <div className="sidebar__headerRight">

        <IconButton >
            
        <DonutLargeIcon/>
        </IconButton>
        <IconButton>
            <ChatIcon/>
        </IconButton>
        <IconButton>
            <MoreVertIcon/>
        </IconButton>
    </div>
    </div>
    <div className="sidebar__search">
        <div className="sidebar__searchContainer">
            <SearchOutlined/>
            <input placeholder="Search " type="text"/>
        </div>
     </div>
     <div className="sidebar__chats">
        <SidebarChat/>
        <SidebarChat/>
        <SidebarChat/>
        <SidebarChat/>
        <SidebarChat/>
        <SidebarChat/>
        <SidebarChat/>
        

     </div>
     </div>
     );
}

export default Sidebar;
