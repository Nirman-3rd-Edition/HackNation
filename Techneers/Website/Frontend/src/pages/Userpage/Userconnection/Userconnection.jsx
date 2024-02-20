import React, { useEffect, useState } from "react";
import LspNavbar from "../../../components/Topnavbar/LspNavbar/LspNavbar";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
  HStack,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import {
  getcasedetailss,
  usercheck,
  caseupdate,
  caseupdatee,
} from "../../../Routes/APIRoutes.js";
import UserNavbar from "../../../components/Topnavbar/UserNavbar/UserNavbar.jsx";
import { Link } from "react-router-dom";

const Userconnection = () => {
  const [data, setdata] = useState([]);
  const [userid, setuserid] = useState("");
  const [status, setstatus] = useState("");

  const handlecasedetails = async (id) => {
    try {
      // Fetch notifications from the server
      const response = await axios.get(`${getcasedetailss}/${id}`);
      console.log(response.data);
      setdata(response.data.caseDetails);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };
  const getlsp = async () => {
    const token = localStorage.getItem("token");
    console.log(token);
    try {
      const response = await axios.get(usercheck, {
        headers: {
          token: `${token}`, // Replace with your actual JWT token
        }, // Include credentials (cookies, authorization headers)
      });

      console.log("Data from server:", response.data);
      setuserid(response.data.userId);
      handlecasedetails(response.data.userId);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getlsp();
  }, []);

  return (
    <div>
      <UserNavbar />
      <TableContainer>
        <Table variant="simple" width="100%">
          <Thead>
            <Tr>
              <Th>Sl no</Th>
              <Th>Case Id</Th>
              <Th>Legal Service Providers ID</Th>
              <Th>Title</Th>
              <Th>Description</Th>

              <Th>Status</Th>
              <Th>Appointment Date</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>

          <Tbody>
            {data.map((card, index) => (
              <Tr>
                <Td>{index + 1}</Td>
                <Td>{card._id}</Td>
                <Td>{card.lspid}</Td>
                <Td>{card.title}</Td>
                <Td>{card.desc}</Td>

                <Td>
                  {card.accept == "0" ? (
                    <p className="p-3 text-xs font-bold uppercase tracking-wider text-black-300 bg-red-600 rounded-lg bg-opacity-50">
                      Pending
                    </p>
                  ) : (
                    <p className="p-3 text-xs font-bold uppercase tracking-wider text-black-300 bg-green-600 rounded-lg bg-opacity-50">
                      Accepted
                    </p>
                  )}
                </Td>

                <Td>{card.appointmentdate}</Td>

                <Td>
                  <HStack spacing="2">
                    {card.accept == "0" ? (
                      <Button colorScheme="messenger" size="sm" isDisabled>
                        Connect Now
                      </Button>
                    ) : (
                      <Link to={`/payment/${card.lspid}/${card._id}`}>
                        <Button colorScheme="messenger" size="sm">
                          Connect Now
                        </Button>
                      </Link>
                    )}

                    {card.payment == "0" ? (
                      <Button colorScheme="red" size="sm" isDisabled>
                        View Details
                      </Button>
                    ) : (
                      <Link to={`/casedetails/${card._id}`}>
                        <Button colorScheme="red" size="sm">
                          View Details
                        </Button>
                      </Link>
                    )}
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Userconnection;
