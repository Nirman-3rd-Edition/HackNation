// import React, { useEffect, useState, useRef } from "react";
// import axios from "axios";
// import { useNavigate, useParams } from "react-router-dom";
// import { io } from "socket.io-client";
// import styled from "styled-components";
// import {
//   allUsersRoute,
//   host,
//   getuserdetails,
//   usercheck,
// } from "../../Routes/APIRoutes.js";
// import Contacts from "../../components/Realtimechat/Contacts.jsx";

// // import ChatContainer from "../../components/Realtimechat/ChatContainer.jsx";

// export default function Chat() {
//   const navigate = useNavigate();
//   const socket = useRef();
//   const [contacts, setContacts] = useState([]);
//   const [currentChat, setCurrentChat] = useState("");
//   const [currentUser, setCurrentUser] = useState("");
//   const [userId, setUserId] = useState("");
//   //   const [user, setuser] = useState([]);
//   const { lspid } = useParams();

//   const getuserdetailss = async (id) => {
//     try {
//       const getuserdetailss = getuserdetails;
//       const response = await axios.get(`${getuserdetailss}/${id}`);

//       console.log(response.data);
//       setCurrentUser(response.data.user);
//       curuser();
//     } catch (error) {
//       console.error("Login failed:", error);
//     }
//   };

//   const getuser = async () => {
//     const token = localStorage.getItem("token");
//     console.log(token);
//     try {
//       const response = await axios.get(usercheck, {
//         headers: {
//           token: `${token}`, // Replace with your actual JWT token
//         }, // Include credentials (cookies, authorization headers)
//       });

//       console.log("Data from server:", response.data);
//       setUserId(response.data.userId);
//       getuserdetailss(response.data.userId);
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   const curuser = async () => {
//     if (currentUser) {
//       console.log(currentUser);
//       if (currentUser.isAvatarImageSet) {
//         const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
//         console.log(data.data);
//         setContacts(data.data);

//         // if (currentUser) {
//         //   socket.current = io(host);
//         //   socket.current.emit("add-user", currentUser._id);
//         // }
//       } else {
//         navigate(`/setAvatar/${lspid}`);
//       }
//     }
//   };

//   useEffect(() => {
//     getuser();
//   }, []);

//   const handleChatChange = (chat) => {
//     console.log(chat);
//     setCurrentChat(chat);
//   };
//   return (
//     <>
//       <Container>
//         <div className="container">
//           <Contacts
//             contacts={contacts}
//             changeChat={handleChatChange}
//             id={lspid}
//           />
//           {/* <ChatContainer currentChat={currentChat} socket={socket} aid={aid} /> */}
//         </div>
//       </Container>
//     </>
//   );
// }

// const Container = styled.div`
//   height: 100vh;
//   width: 100vw;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   gap: 1rem;
//   align-items: center;
//   background-color: #333130;
//   .container {
//     height: 85vh;
//     width: 85vw;
//     background-color: #c5fff8;
//     display: grid;
//     grid-template-columns: 25% 75%;
//     @media screen and (min-width: 720px) and (max-width: 1080px) {
//       grid-template-columns: 35% 65%;
//     }
//   }
// `;
