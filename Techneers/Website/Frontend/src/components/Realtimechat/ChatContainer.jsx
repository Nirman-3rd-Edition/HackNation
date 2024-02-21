// import React, { useState, useEffect, useRef } from "react";
// import styled from "styled-components";
// // import ChatInput from "./ChatInput";

// import { v4 as uuidv4 } from "uuid";
// import axios from "axios";
// import {
//   sendMessageRoute,
//   recieveMessageRoute,
//   getuserdetails,
//   usercheck,
// } from "../../Routes/APIRoutes.js";

// export default function ChatContainer({ currentChat, socket, aid }) {
//   const [userId, setUserId] = useState("");
//   const [user, setuser] = useState([]);
//   const [messages, setMessages] = useState([]);
//   const scrollRef = useRef();
//   const [arrivalMessage, setArrivalMessage] = useState(null);

//   const getuserdetailss = async (id) => {
//     try {
//       const getuserdetailss = getuserdetails;
//       const response = await axios.get(`${getuserdetailss}/${id}`);

//       console.log(response.data);
//       setuser(response.data.user);
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

//       console.log(userId);
//       console.log(aid);
//       const responses = await axios.post(recieveMessageRoute, {
//         from: userId,
//         to: aid,
//       });
//       console.log(responses.data);
//       setMessages(responses.data);
//       getuserdetailss(response.data.userId);
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   useEffect(() => {
//     getuser();
//   }, []);

//   useEffect(() => {
//     const getCurrentChat = async () => {
//       if (currentChat) {
//         const id = userId;
//       }
//     };
//     getCurrentChat();
//   }, [currentChat]);

//   const handleSendMsg = async (msg) => {
//     socket.current.emit("send-msg", {
//       to: aid,
//       from: userId,
//       msg,
//     });
//     await axios.post(sendMessageRoute, {
//       from: userId,
//       to: aid,
//       message: msg,
//     });

//     const msgs = [...messages];
//     msgs.push({ fromSelf: true, message: msg });
//     setMessages(msgs);
//   };

//   useEffect(() => {
//     if (socket.current) {
//       socket.current.on("msg-recieve", (msg) => {
//         setArrivalMessage({ fromSelf: false, message: msg });
//       });
//     }
//   }, []);

//   useEffect(() => {
//     arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
//   }, [arrivalMessage]);

//   useEffect(() => {
//     scrollRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   return (
//     <Container>
//       <div className="chat-header">
//         <div className="user-details">
//           <div className="avatar">
//             {/* <img
//               src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
//               alt=""
//             /> */}
//           </div>
//           <div className="username">
//             {/* <h3>{currentChat.username}</h3> */}
//           </div>
//         </div>
//       </div>
//       <div className="chat-messages">
//         {messages.map((message) => {
//           return (
//             <div ref={scrollRef} key={uuidv4()}>
//               <div
//                 className={`message ${
//                   message.fromSelf ? "sended" : "recieved"
//                 }`}
//               >
//                 <div className="content ">
//                   <p>{message.message}</p>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//       {/* <ChatInput handleSendMsg={handleSendMsg} /> */}
//     </Container>
//   );
// }

// const Container = styled.div`
//   display: grid;
//   grid-template-rows: 10% 80% 10%;
//   gap: 0.1rem;
//   overflow: hidden;
//   @media screen and (min-width: 720px) and (max-width: 1080px) {
//     grid-template-rows: 15% 70% 15%;
//   }
//   .chat-header {
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     padding: 0 2rem;
//     .user-details {
//       display: flex;
//       align-items: center;
//       gap: 1rem;
//       .avatar {
//         img {
//           height: 3rem;
//         }
//       }
//       .username {
//         h3 {
//           color: white;
//         }
//       }
//     }
//   }
//   .chat-messages {
//     padding: 1rem 2rem;
//     display: flex;
//     flex-direction: column;
//     gap: 1rem;
//     overflow: auto;
//     &::-webkit-scrollbar {
//       width: 0.2rem;
//       &-thumb {
//         background-color: #7b66ff;
//         width: 0.1rem;
//         border-radius: 1rem;
//       }
//     }
//     .message {
//       display: flex;
//       align-items: center;
//       .content {
//         max-width: 40%;
//         overflow-wrap: break-word;
//         padding: 1rem;
//         font-size: 1.1rem;
//         border-radius: 1rem;
//         color: #d1d1d1;
//         @media screen and (min-width: 720px) and (max-width: 1080px) {
//           max-width: 70%;
//         }
//       }
//     }
//     .sended {
//       justify-content: flex-end;
//       .content {
//         background-color: #ff6c22;
//       }
//     }
//     .recieved {
//       justify-content: flex-start;
//       .content {
//         background-color: #7b66ff;
//       }
//     }
//   }
// `;
