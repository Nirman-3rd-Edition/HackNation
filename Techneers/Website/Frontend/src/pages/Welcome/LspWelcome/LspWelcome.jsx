import React from "react";
import LspNavbar from "../../../components/Topnavbar/LspNavbar/LspNavbar";
import styled from "styled-components";
import Robot from "../../../assets/robot.gif";
import axios from "axios";
import LSPSidebar from "../../../components/Sidebar/LSPSidebar";
const LspWelcome = () => {
  return (
    <div style={{ position: "relative" }}>
      <LspNavbar />
      <LSPSidebar />
      <Container>
        <img src={Robot} alt="" />
        <h1>
          Welcome, <span>Hi Legal Service Provide !!!!</span>
        </h1>
      </Container>
    </div>
  );
};

const Container = styled.div`
  height: 89.2vh;
  background-color: #131324;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  span {
    color: #4e0eff;
  }
`;

export default LspWelcome;
