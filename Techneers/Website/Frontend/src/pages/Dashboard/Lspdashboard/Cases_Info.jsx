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

const Cases_Info = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const advocatesData = [
    {
      id: 1,
      title: "Criminal Case",
      desc: "lorem epsum dvbdkvdvdf v dfbdfbndsjv dsvndsvkdskvdskvds vd  dskvdskbds v dsvkdsvhkdsnvd sv dsvdsbvjdsvdsvdsmvbdsjvdsvkm",
      from: "Jhon Doe",
      status: "Pending",
    },
    {
      id: 2,
      title: "Maretial case",
      desc: "lorem epsum",
      from: "Rama Sharma",
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
    advocate.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <VStack spacing="4" align="center" padding={["20px", "40px"]}>
        <Text fontSize="xl" fontWeight="bold">
          Cases Information
        </Text>
        <Box width="100%" maxWidth="600px">
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <BiSearch color="gray.300" />
            </InputLeftElement>
            <Input
              type="text"
              placeholder="Search by title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
        </Box>
        <Box width="100%">
          <Table variant="simple" width="100%">
            <Thead>
              <Tr>
                <Th>Title</Th>
                <Th>Description</Th>
                <Th>From</Th>
                <Th>Status</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredAdvocates.map((advocate) => (
                <Tr key={advocate.id}>
                  <Td>{advocate.title}</Td>
                  <Td>{advocate.desc}</Td>

                  <Td>{advocate.from}</Td>

                  <Td>{advocate.status}</Td>
                  <Td>
                    <HStack spacing="2">
                      {advocate.status === "Pending" && (
                        <Button
                          colorScheme="green"
                          size="sm"
                          onClick={() => handleApprove(advocate.id)}
                        >
                          Accept
                        </Button>
                      )}
                      {advocate.status === "Approved" && (
                        <Button
                          colorScheme="orange"
                          size="sm"
                          onClick={() => handlePending(advocate.id)}
                        >
                          Reject
                        </Button>
                      )}
                      <Button
                        colorScheme="red"
                        size="sm"
                        onClick={() => handleDelete(advocate.id)}
                      >
                        Delete
                      </Button>
                      <Button
                        colorScheme="purple"
                        size="sm"
                        onClick={() => handleDelete(advocate.id)}
                      >
                        Chat Now
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

export default Cases_Info;
