import React from "react";
import {Avatar,IconButton} from "@mui/material";
import "./Sidebar.css";
import {SearchOutlined} from "@mui/icons-material";

import SidebarChat from "./SidebarChat";

function Sidebar() {
  return (
    <div className="sidebar">
        <div className="sidebar_header">
            <Avatar src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.vectorstock.com%2Froyalty-free-vector%2Fbusinesswoman-character-avatar-icon-vector-12800169&psig=AOvVaw2D12iBnr-LZ6IZlOJXVcST&ust=1708528491252000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCPDai-CauoQDFQAAAAAdAAAAABAE"/> 
            <div className="sidebar_headerRight">       
                  <h1><span>Heal-</span>Tech</h1>
            </div>
        </div>
        <div className="sidebar_search">
            <div className="sidebar_searchContainer">
            <SearchOutlined />
            <input placeholder="Search" type="text"/>
            </div>
        </div>
        <div className="sidebar_chats">
            <SidebarChat addNewChat/>
            <SidebarChat/>
            
            
        </div>
    </div>
  );
}

export default Sidebar;
