import React, { useState } from "react";
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
  Text,
  Input,
  InputGroup,
  InputLeftElement,
  Box,
  VStack,
  Stack,
} from "@chakra-ui/react";
import { BiSearch } from "react-icons/bi";

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

const ListOfComplaints = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Sample data for complaints
  const complaintsData = [
    {
      id: 1,
      serviceProvider: "John Doe",
      email: "john.doe@example.com",
      occupation: "Advocate",
      date: "2023-01-01",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      status: "Solved",
    },
    {
      id: 2,
      serviceProvider: "Jane Smith",
      email: "jane.smith@example.com",
      occupation: "Arbitrator",
      date: "2023-02-01",
      description:
        "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      status: "Not Solved",
    },
    // Add more complaint data as needed
  ];

  // Filter complaints based on search term
  const filteredComplaints = complaintsData.filter((complaint) =>
    complaint.serviceProvider.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <div style={{ marginLeft: "15rem" }}>
        <VStack spacing="7" align="center" padding={["20px", "40px"]}>
          <Text fontSize="xl" fontWeight="bold" color="white">
            List of Complaints
          </Text>
          {/* Rectangular search bar */}
          <Box width="100%" maxWidth="600px">
            <InputGroup>
              <InputLeftElement>
                <BiSearch color="gray.300" />
              </InputLeftElement>
              <Input
                type="text"
                placeholder="Search by service provider name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                borderRadius="md"
              />
            </InputGroup>
          </Box>
          {/* Table of complaints */}
          <Stack spacing={["4", "8"]} width="100%" maxWidth="800px">
            {filteredComplaints.map((complaint) => (
              <Box
                key={complaint.id}
                borderWidth="1px"
                borderRadius="lg"
                boxShadow="lg"
                p="4"
              >
                <Text fontSize="xl" fontWeight="bold" mb="2">
                  Service Provider: {complaint.serviceProvider}
                </Text>
                <Text>Email: {complaint.email}</Text>
                <Text>Occupation: {complaint.occupation}</Text>
                <Text>Date: {complaint.date}</Text>
                <Text>Description: {complaint.description}</Text>
                <Text
                  color={complaint.status === "Solved" ? "green" : "red"}
                  fontWeight="bold"
                >
                  Status: {complaint.status}
                </Text>
              </Box>
            ))}
          </Stack>
        </VStack>
      </div>
    </ChakraProvider>
  );
};

export default ListOfComplaints;
