"use client";

import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Stack,
  Image,
  Button,
  useDisclosure,
  useStatStyles,
} from "@chakra-ui/react";

import img from "../assets/image.jpg";
import { Link, useParams } from "react-router-dom";
import UserNavbar from "./Topnavbar/UserNavbar/UserNavbar";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  getlspdetails,
  paymentupdate,
  booking,
  allcasedetails,
  getuserdetails,
  usercheck,
} from "../Routes/APIRoutes.js";
import axios from "axios";

function Thankyou() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { lspid, payid } = useParams();
  const [allimage, setallimage] = useState([]);
  const [name, setname] = useState([]);
  var [token, settoken] = useState();
  // const [userfirstname, setuserfirstname] = useState("");
  // const [userlastname, setuserlastname] = useState("");
  // const [userphoneno, setuserphoneno] = useState("");
  // const [lspfirstname, setlspfirstname] = useState("");
  // const [lsplastname, setlsplastname] = useState("");
  // const [lspphoneno, setlspphoneno] = useState("");
  // const [appointmentdate, setappointmentdate] = useState("");

  const getuser = async () => {
    const tokenn = localStorage.getItem("token");
    console.log(tokenn);
    try {
      const responsea = await axios.get(usercheck, {
        headers: {
          token: `${tokenn}`, // Replace with your actual JWT token
        }, // Include credentials (cookies, authorization headers)
      });

      console.log("Data from server:", responsea.data);
      const userId = responsea.data.userId;
      await getuserdetailss(userId);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getuserdetailss = async (userid) => {
    try {
      const responseee = await axios.get(`${getuserdetails}/${userid}`);
      console.log(responseee.data.user);
      const user = responseee.data.user;
      handlebooking(user.firstname, user.lastname, user.email);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleLogin = async (lspid) => {
    console.log(lspid);
    handlepayment(payid);
    try {
      const responseabc = await axios.get(`${getlspdetails}/${lspid}`);
      console.log(responseabc.data);
      setallimage(responseabc.data);
      return responseabc.data;
    } catch (error) {
      console.error("error", error);
    }
  };

  const handlepayment = async (payid) => {
    console.log(payid);
    try {
      const responseab = await axios.post(`${paymentupdate}/${payid}`);
      console.log(responseab.data.message);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };
  const randomnumber = async () => {
    var tokene = Math.floor(1000 + Math.random() * 9000);
    return tokene;
  };

  const handlebooking = async (userfirstname, userlastname, userphoneno) => {
    try {
      const dd = await handleLogin(lspid);
      console.log(dd);
      const tokk = await randomnumber();
      console.log(tokk);
      settoken(tokk);

      console.log(userfirstname);

      const ress = await axios.get(`${allcasedetails}/${payid}`);
      console.log(ress.data.caseDetails[0].appointmentdate);
      let appointmentdatee = ress.data.caseDetails[0].appointmentdate;

      const responsee = await axios.post(booking, {
        userfirstname,
        userlastname,
        userphoneno,
        lspfirstname: dd.firstname,
        lsplastname: dd.lastname,
        lspphoneno: dd.phoneno,
        caseid: payid,
        token: tokk,
        appointmentdate: appointmentdatee,
      });
      onOpen();
      console.log(responsee.data);
    } catch (error) {
      console.error("Error in booking", error);
    }
  };
  // useEffect(() => {
  //   getuser();
  // }, []);

  return (
    <>
      <UserNavbar />
      <Center py={24}>
        <Box
          role={"group"}
          p={6}
          maxW={"330px"}
          w={"full"}
          bg={useColorModeValue("white", "gray.800")}
          boxShadow={"2xl"}
          rounded={"lg"}
          pos={"relative"}
          zIndex={1}
        >
          <Box
            rounded={"lg"}
            mt={-12}
            pos={"relative"}
            height={"230px"}
            _after={{
              transition: "all .3s ease",
              content: '""',
              w: "full",
              h: "full",
              pos: "absolute",
              top: 5,
              left: 0,
              filter: "blur(15px)",
              zIndex: -1,
            }}
            _groupHover={{
              _after: {
                filter: "blur(20px)",
              },
            }}
          >
            <Image
              rounded={"lg"}
              height={230}
              width={282}
              objectFit={"cover"}
              src={img}
              alt="#"
            />
          </Box>
          <Stack pt={10} align={"center"}>
            <Heading fontSize={"2xl"} fontFamily={"body"} fontWeight={500}>
              Here the Lsp Details
            </Heading>
            <Stack direction={"row"} align={"center"}>
              <Button onClick={getuser}>View Details</Button>
            </Stack>
          </Stack>
        </Box>
      </Center>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Legal Service Provide Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <h1 align={"center"}>
              <b>{allimage.role}</b>
            </h1>
            <h1 align={"center"}>
              <u>
                <b> Token Number : </b>
                <b style={{ backgroundColor: "yellow" }}> # {token}</b>
              </u>
            </h1>

            <h1 style={{ marginTop: "20px" }}>
              <b>Firstname :</b> {allimage.firstname}
            </h1>

            <h1>
              <b>Lastname :</b> {allimage.lastname}
            </h1>

            {/* <h1>
              <b>Email : {allimage.email}</b>
            </h1>
            <h1>
              <b>Phone Number: {allimage.phoneno}</b>
            </h1> */}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Link to={`/casedetails/${payid}`}>
              <Button colorScheme="whatsapp">Connect Now</Button>
            </Link>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
export default Thankyou;
