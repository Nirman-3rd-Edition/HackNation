import React,{useEffect,useState}from "react";
import "./SidebarChat.css";



function SidebarChat({addNewChat}) {
    const [seed,setSeed]=useState("");
     useEffect(()=>{
        setSeed(Math.floor( Math.random()*5000));

     },[]);
    const createChat=()=>{
      const roomName=prompt("Please enter name for chat");
      if(roomName){
        
      }
    };

  return  !addNewChat? (
    <div className="sidebar_chats">
          <ul>
                      <button><h2><a href="./About.js">About Us </a></h2> </button>
                      <button><h2><a href="./Clubs.js">Clubs</a></h2></button>
                      <button><h2><a href="./Updates.js">Updates</a></h2></button>
                      <button><h2><a href="./Activity.js">Activity</a></h2></button>
                      </ul>

 </div>

  ):(
    <div onClick={createChat}
    className="sidebar_chats">
      
    </div>

  );

}

export default SidebarChat;
