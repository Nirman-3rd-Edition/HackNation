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

const Notaries_Info = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Sample data for notaries
  const notariesData = [
    {
      id: 1,
      name: "David Johnson",
      email: "david.johnson@example.com",
      phone: "123-456-7890",
      location: "City, Country",
      specialisation: "Legal Documents",
      status: "Pending",
    },
    {
      id: 2,
      name: "Emily Brown",
      email: "emily.brown@example.com",
      phone: "987-654-3210",
      location: "Another City, Country",
      specialisation: "Notarial Acts",
      status: "Approved",
    },
    // Add more notary data as needed
  ];

  const handleApprove = (id) => {
    console.log(`Approve notary with id ${id}`);
  };

  const handlePending = (id) => {
    console.log(`Mark notary with id ${id} as pending`);
  };

  const handleDelete = (id) => {
    console.log(`Delete notary with id ${id}`);
  };

  const filteredNotaries = notariesData.filter((notary) =>
    notary.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <VStack spacing={["4", "8"]} align="center" padding={["4", "8"]}>
        <Text fontSize="xl" fontWeight="bold">
          Notary Information
        </Text>
        <Box width="100%" maxW={["100%", "600px"]}>
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
        <Box width="100%" overflow="auto">
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
              {filteredNotaries.map((notary) => (
                <Tr key={notary.id}>
                  <Td>{notary.name}</Td>
                  <Td>{notary.email}</Td>
                  <Td>{notary.phone}</Td>
                  <Td>{notary.location}</Td>
                  <Td>{notary.specialisation}</Td>
                  <Td>{notary.status}</Td>
                  <Td>
                    <HStack spacing="2">
                      {notary.status === "Pending" && (
                        <Button
                          colorScheme="green"
                          size="sm"
                          onClick={() => handleApprove(notary.id)}
                        >
                          Approve
                        </Button>
                      )}
                      {notary.status === "Approved" && (
                        <Button
                          colorScheme="orange"
                          size="sm"
                          onClick={() => handlePending(notary.id)}
                        >
                          Pending
                        </Button>
                      )}
                      <Button
                        colorScheme="red"
                        size="sm"
                        onClick={() => handleDelete(notary.id)}
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

export default Notaries_Info;
