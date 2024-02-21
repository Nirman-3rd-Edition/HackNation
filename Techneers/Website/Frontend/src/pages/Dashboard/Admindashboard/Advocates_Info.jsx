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

const Advocates_Info = () => {
  const [searchTerm, setSearchTerm] = useState("");
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

  const filteredAdvocates = advocatesData.filter((advocate) =>
    advocate.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <VStack spacing="4" align="center" padding={["20px", "40px"]}>
        <Text fontSize="xl" fontWeight="bold">
          Advocate Information
        </Text>
        <Box width="100%" maxWidth="600px">
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <BiSearch color="gray.300" />
            </InputLeftElement>
            <Input
              type="text"
              placeholder="Search by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
        </Box>
        <Box width="100%">
          <Table variant="simple" width="100%">
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Phone</Th>
                <Th>Location</Th>
                <Th>Specialisation</Th>
                <Th>Status</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredAdvocates.map((advocate) => (
                <Tr key={advocate.id}>
                  <Td>{advocate.name}</Td>
                  <Td>{advocate.email}</Td>
                  <Td>{advocate.phone}</Td>
                  <Td>{advocate.location}</Td>
                  <Td>{advocate.specialisation}</Td>
                  <Td>{advocate.status}</Td>
                  <Td>
                    <HStack spacing="2">
                      {advocate.status === "Pending" && (
                        <Button
                          colorScheme="green"
                          size="sm"
                          onClick={() => handleApprove(advocate.id)}
                        >
                          Approve
                        </Button>
                      )}
                      {advocate.status === "Approved" && (
                        <Button
                          colorScheme="orange"
                          size="sm"
                          onClick={() => handlePending(advocate.id)}
                        >
                          Pending
                        </Button>
                      )}
                      <Button
                        colorScheme="red"
                        size="sm"
                        onClick={() => handleDelete(advocate.id)}
                      >
                        Delete
                      </Button>
                    </HStack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </VStack>
    </ChakraProvider>
  );
};

export default Advocates_Info;
