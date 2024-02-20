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

const DocumentWriters_Info = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Sample data for document writers
  const documentWritersData = [
    {
      id: 1,
      name: "Alex Turner",
      email: "alex.turner@example.com",
      phone: "123-456-7890",
      location: "City, Country",
      specialisation: "Legal Documents",
      status: "Pending",
    },
    {
      id: 2,
      name: "Eva Williams",
      email: "eva.williams@example.com",
      phone: "987-654-3210",
      location: "Another City, Country",
      specialisation: "Contracts",
      status: "Approved",
    },
    // Add more document writer data as needed
  ];

  const handleApprove = (id) => {
    console.log(`Approve document writer with id ${id}`);
  };

  const handlePending = (id) => {
    console.log(`Mark document writer with id ${id} as pending`);
  };

  const handleDelete = (id) => {
    console.log(`Delete document writer with id ${id}`);
  };

  const filteredDocumentWriters = documentWritersData.filter((documentWriter) =>
    documentWriter.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <VStack spacing={["4", "8"]} align="center" padding={["4", "8"]}>
        <Text fontSize="xl" fontWeight="bold">
          Document Writer Information
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
              {filteredDocumentWriters.map((documentWriter) => (
                <Tr key={documentWriter.id}>
                  <Td>{documentWriter.name}</Td>
                  <Td>{documentWriter.email}</Td>
                  <Td>{documentWriter.phone}</Td>
                  <Td>{documentWriter.location}</Td>
                  <Td>{documentWriter.specialisation}</Td>
                  <Td>{documentWriter.status}</Td>
                  <Td>
                    <HStack spacing="2">
                      {documentWriter.status === "Pending" && (
                        <Button
                          colorScheme="green"
                          size="sm"
                          onClick={() => handleApprove(documentWriter.id)}
                        >
                          Approve
                        </Button>
                      )}
                      {documentWriter.status === "Approved" && (
                        <Button
                          colorScheme="orange"
                          size="sm"
                          onClick={() => handlePending(documentWriter.id)}
                        >
                          Pending
                        </Button>
                      )}
                      <Button
                        colorScheme="red"
                        size="sm"
                        onClick={() => handleDelete(documentWriter.id)}
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

export default DocumentWriters_Info;
