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

const Users_Info = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Sample data for users
  const usersData = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "123-456-7890",
      location: "City, Country",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phone: "987-654-3210",
      location: "Another City, Country",
    },
    // Add more user data as needed
  ];

  const handleDelete = (id) => {
    console.log(`Delete user with id ${id}`);
  };

  const filteredUsers = usersData.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <VStack spacing={["4", "8"]} align="center" padding={["4", "8"]}>
        <Text fontSize="xl" fontWeight="bold">
          User Information
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
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredUsers.map((user) => (
                <Tr key={user.id}>
                  <Td>{user.name}</Td>
                  <Td>{user.email}</Td>
                  <Td>{user.phone}</Td>
                  <Td>{user.location}</Td>
                  <Td>
                    <Button
                      colorScheme="red"
                      size="sm"
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </Button>
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

export default Users_Info;
