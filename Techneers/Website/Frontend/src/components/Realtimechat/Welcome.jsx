import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Robot from "../../assets/robot.gif";
import axios from "axios";
import { getuserdetails, usercheck } from "../../Routes/APIRoutes.js";
export default function Welcome() {
  const [userName, setUserName] = useState("");

  const getuserdetailss = async (id) => {
    try {
      const getuserdetailss = getuserdetails;
      const response = await axios.get(`${getuserdetailss}/${id}`);

      console.log(response.data);
      setUserName(response.data.user);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };
  useEffect(async () => {
    const token = localStorage.getItem("token");
    console.log(token);
    try {
      const response = await axios.get(usercheck, {
        headers: {
          token: `${token}`, // Replace with your actual JWT token
        }, // Include credentials (cookies, authorization headers)
      });
    } catch (error) {
      console.error("Error:", error);
    }

    console.log("Data from server:", response.data);

    getuserdetailss(response.data.userId);
  }, []);
  return (
    <Container>
      <img src={Robot} alt="" />
      <h1>
        Welcome, <span>{userName}!</span>
      </h1>
      <h3>Please select a chat to Start messaging.</h3>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  img {
    height: 20rem;
  }
  span {
    color: #4e0eff;
  }
`;
