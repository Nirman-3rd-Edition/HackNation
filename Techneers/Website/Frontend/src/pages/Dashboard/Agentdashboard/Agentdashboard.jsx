import React, { useEffect, useState } from "react";
import {
  ChakraProvider,
  CSSReset,
  extendTheme,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  HStack,
  Button,
  VStack,
  Text,
  Input,
  InputGroup,
  InputLeftElement,
  Box,
} from "@chakra-ui/react";
import { BiSearch } from "react-icons/bi";
import AgentNavbar from "../../../components/Topnavbar/AgentNavbar/Agentnavbar";
import {
  allcasedetails,
  bookdetails,
  allbookingdetails,
} from "../../../Routes/APIRoutes.js";
import axios from "axios";

const theme = extendTheme({
  styles: {
    global: {
      "html, body": {
        margin: 0,
        padding: 0,
        boxSizing: "border-box",
        fontFamily: "sans-serif",
      },
    },
  },
});

const Agentdashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [details, setdetails] = useState([]);
  const advocatesData = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "123-456-7890",
      location: "City, Country",
      specialisation: "Criminal Law",
      status: "Pending",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phone: "987-654-3210",
      location: "Another City, Country",
      specialisation: "Family Law",
      status: "Approved",
    },
    // Add more advocate data as needed
  ];

  const handleApprove = (id) => {
    // Handle approve action for the advocate with the given id
    console.log(`Approve advocate with id ${id}`);
  };

  const handlePending = (id) => {
    // Handle pending action for the advocate with the given id
    console.log(`Mark advocate with id ${id} as pending`);
  };

  const handleDelete = (id) => {
    // Handle delete action for the advocate with the given id
    console.log(`Delete advocate with id ${id}`);
  };

  const allcasedetailss = async () => {
    try {
      const ress = await axios.get(allbookingdetails);
      console.log(ress.data);
      setdetails(ress.data);
      // const resss = await axios.get(`${bookdetails}/${caseid}`);
      // console.log(resss.data[0].token);
      // settoken(resss.data[0].token);
    } catch (error) {
      console.error("Error in server", error);
    }
  };

  const filteredAdvocates = details.filter((advocate) =>
    advocate.token.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    allcasedetailss();
  }, []);

  return (
    <>
      <AgentNavbar />
      <ChakraProvider theme={theme}>
        <CSSReset />
        <VStack spacing="4" align="center" padding={["20px", "40px"]}>
          <Text fontSize="xl" fontWeight="bold">
            Appointment Information
          </Text>
          <Box width="100%" maxWidth="600px">
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <BiSearch color="gray.300" />
              </InputLeftElement>
              <Input
                type="text"
                placeholder="Search by token Number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </InputGroup>
          </Box>
          <Box width="100%">
            <Table variant="simple" width="100%">
              <Thead>
                <Tr>
                  <Th>Sl No</Th>
                  <Th>Name</Th>
                  <Th>Phone</Th>
                  <Th>Token Number</Th>
                  <Th>LSP Name</Th>
                  <Th>LSP Phone Number</Th>
                  <Th>Status</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {filteredAdvocates.map((advocate, index) => (
                  <Tr key={index}>
                    <Td>1</Td>
                    <Td>
                      {advocate.userfirstname} <span></span>
                      {advocate.userlastname}
                    </Td>
                    <Td>{advocate.userphoneno}</Td>
                    <Td># {advocate.token}</Td>
                    <Td>
                      {advocate.lspfirstname} <span></span>
                      {advocate.lsplastname}
                    </Td>
                    <Td>{advocate.lspphoneno}</Td>
                    <Td>Pending</Td>
                    <Td>
                      <HStack spacing="2">
                        {/* {advocate.status === "Pending" && ( */}
                        <Button
                          colorScheme="green"
                          size="sm"
                          onClick={() => handleApprove(advocate.id)}
                        >
                          Approve
                        </Button>
                        {/* )} */}
                        {/* {advocate.status === "Approved" && ( */}
                        {/* <Button
                          colorScheme="orange"
                          size="sm"
                          onClick={() => handlePending(advocate.id)}
                        >
                          Pending
                        </Button> */}
                        {/* )} */}
                        {/* <Button
                          colorScheme="red"
                          size="sm"
                          onClick={() => handleDelete(advocate.id)}
                        >
                          Delete
                        </Button> */}
                      </HStack>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </VStack>
      </ChakraProvider>
    </>
  );
};

export default Agentdashboard;
