import React, { useEffect, useState } from "react";
import "./CaseDeatails.css";
import { Button } from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";
import UserNavbar from "../../components/Topnavbar/UserNavbar/UserNavbar";
import {
  allcasedetails,
  bookdetails,
  getlspdetails,
} from "../../Routes/APIRoutes.js";
import axios from "axios";

const CaseDetails = () => {
  const [roomid, setroomid] = useState("");
  const [socket, setSocket] = useState(null);
  const [casedetails, setcasedetails] = useState([]);
  const [lspdetails, setlspdetails] = useState([]);
  const [token, settoken] = useState("");
  const { caseid } = useParams();

  const allcasedetailss = async () => {
    console.log(caseid);
    try {
      const ress = await axios.get(`${allcasedetails}/${caseid}`);
      console.log(ress.data);
      const resss = await axios.get(`${bookdetails}/${caseid}`);
      console.log(resss.data[0].token);
      settoken(resss.data[0].token);
      console.log(ress.data.caseDetails[0].lspid);
      handleLogin(ress.data.caseDetails[0].lspid);
    } catch (error) {
      console.error("Error in server", error);
    }
  };

  const handleLogin = async (lspid) => {
    console.log(lspid);
    try {
      const responseabc = await axios.get(`${getlspdetails}/${lspid}`);
      console.log(responseabc.data);
      setlspdetails(responseabc.data);
    } catch (error) {
      console.error("error", error);
    }
  };

  useEffect(() => {
    allcasedetailss();
    console.log("hi viek ");
  });

  useEffect(() => {
    const newSocket = new WebSocket("ws://localhost:5001");

    newSocket.onopen = () => {
      console.log("WebSocket connection opened");
    };

    newSocket.onmessage = (event) => {
      // Update the received Zoom call link
      console.log(event.data);
    };

    setSocket(newSocket);

    return () => {
      // Close the socket when the component unmounts
      newSocket.close();
    };
  }, []);
  return (
    <div>
      <UserNavbar />
      <div align={"center"} style={{ fontSize: "3rem" }}>
        Case Details
      </div>
      <div className="pa">
        <div>
          <h1>
            {" "}
            <u>
              <b>Legal Service Provider Details</b>
            </u>
          </h1>
          <h1>Firstname: {lspdetails.firstname}</h1>
          <h1>Lastname: {lspdetails.lastname}</h1>

          <h1>
            Communicaton Mode:
            <Link to={`/videocall?roomID=${roomid}`}>
              <Button colorScheme="messenger" marginRight={3}>
                Video Call
              </Button>
            </Link>
            <Button colorScheme="whatsapp">Live chat</Button>
          </h1>
        </div>
        <div>
          <h1>
            <b>Token Number:</b>
            <b style={{ backgroundColor: "yellow", color: "black" }}>
              # {token}
            </b>
          </h1>
          <h1>Agent Phone Number: +91 123456789</h1>
        </div>
      </div>

      <div
        style={{ textAlign: "center", margin: "10px 0px", fontSize: "30px" }}
      >
        <h1>TimeLine</h1>
      </div>
      <div className="timeline">
        <div className="container left">
          <div className="date">15 Dec 2023</div>
          <i className="icon fa fa-home"></i>
          <div className="content">
            <h2>Case Title: Sharma v. State of Uttar Pradesh & Others</h2>
            <p>
              The appellant, Rakesh Sharma, has filed a criminal appeal
              challenging his conviction and sentencing in the lower court for
              alleged involvement in a rioting incident. He contends that there
              were procedural irregularities during the trial, leading to a
              miscarriage of justice.
            </p>
          </div>
        </div>
        <div className="container right">
          <div className="date">22 Oct 2023</div>
          <i className="icon fa fa-gift"></i>
          <div className="content">
            <h2>Lorem ipsum dolor sit amet</h2>
            <p>
              Lorem ipsum dolor sit amet elit. Aliquam odio dolor, id luctus
              erat sagittis non. Ut blandit semper pretium.
            </p>
          </div>
        </div>
        <div className="container left">
          <div className="date">10 Jul 2023</div>
          <i className="icon fa fa-user"></i>
          <div className="content">
            <h2>Lorem ipsum dolor sit amet</h2>
            <p>
              Lorem ipsum dolor sit amet elit. Aliquam odio dolor, id luctus
              erat sagittis non. Ut blandit semper pretium.
            </p>
          </div>
        </div>
        <div className="container right">
          <div className="date">18 May 2023</div>
          <i className="icon fa fa-running"></i>
          <div className="content">
            <h2>Lorem ipsum dolor sit amet</h2>
            <p>
              Lorem ipsum dolor sit amet elit. Aliquam odio dolor, id luctus
              erat sagittis non. Ut blandit semper pretium.
            </p>
          </div>
        </div>
        <div className="container left">
          <div className="date">10 Feb 2023</div>
          <i className="icon fa fa-cog"></i>
          <div className="content">
            <h2>Lorem ipsum dolor sit amet</h2>
            <p>
              Lorem ipsum dolor sit amet elit. Aliquam odio dolor, id luctus
              erat sagittis non. Ut blandit semper pretium.
            </p>
          </div>
        </div>
        <div className="container right">
          <div className="date">01 Jan 2023</div>
          <i className="icon fa fa-certificate"></i>
          <div className="content">
            <h2>Lorem ipsum dolor sit amet</h2>
            <p>
              Lorem ipsum dolor sit amet elit. Aliquam odio dolor, id luctus
              erat sagittis non. Ut blandit semper pretium.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseDetails;
