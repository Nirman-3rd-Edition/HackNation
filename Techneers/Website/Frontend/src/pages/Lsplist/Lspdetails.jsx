"use client";
import axios from "axios";
import {
  Box,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  List,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
  Textarea,
  ModalOverlay,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserNavbar from "../../components/Topnavbar/UserNavbar/UserNavbar";
import {
  usercheck,
  getlspdetails,
  sendnotification,
  acceptconnect,
} from "../../Routes/APIRoutes.js";

function Lspdetails() {
  var [allimage, setallimage] = useState([]);
  var [user, setuser] = useState("");
  const { id } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [title, settitle] = useState("");
  const [desc, setdesc] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (id) => {
    console.log(id);
    try {
      const response = await axios.get(`${getlspdetails}/${id}`);
      console.log(response.data);
      setallimage(response.data);
    } catch (error) {
      console.error("error", error);
    }
  };

  const handleSendNotification = async () => {
    const message = "new connnection approaches";
    try {
      // Send a notification to the server
      await axios.post(`${sendnotification}/${id}`, {
        senderId: user,
        message,
      });

      alert("Notification sent!");
      setIsLoading(false);
      console.log(user, message);
      onClose();
    } catch (error) {
      console.error("Error sending notification:", error);
      alert("Failed to send notification");
    }
  };

  const handledata = async () => {
    setIsLoading(true);
    try {
      // Send a notification to the server
      const res = await axios.post(`${acceptconnect}/${user}`, {
        lspid: id,
        title,
        desc,
      });
      handleSendNotification();
      console.log(res);
    } catch (error) {
      console.error("Error sending notification:", error);
      alert("Failed to send notification");
    }
  };

  const getuser = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(usercheck, {
        headers: {
          token: `${token}`, // Replace with your actual JWT token
        }, // Include credentials (cookies, authorization headers)
      });

      console.log("Data from server:", response.data);
      setuser(response.data.userId);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getuser();
    handleLogin(id);
  }, []);

  return (
    <>
      <div>
        <UserNavbar />
        <Container maxW={"7xl"}>
          <SimpleGrid
            columns={{ base: 1, lg: 2 }}
            spacing={{ base: 8, md: 10 }}
            py={{ base: 18, md: 12 }}
          >
            <Flex>
              {/* <h1>{user}</h1> */}
              <Image
                rounded={"md"}
                alt={"product image"}
                src="https://cdn1.vectorstock.com/i/1000x1000/83/15/lawyer-cartoon-vector-35528315.jpg"
                fit={"cover"}
                align={"center"}
                w={"100%"}
                h={{ base: "100%", sm: "400px", lg: "500px" }}
              />
            </Flex>
            <Stack spacing={{ base: 6, md: 10 }}>
              <Box>
                <Heading
                  lineHeight={1.1}
                  fontWeight={600}
                  fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
                >
                  {/* {allimage.name} */}
                </Heading>
                <Text
                  color={useColorModeValue("gray.900", "gray.400")}
                  fontWeight={300}
                  fontSize={"2xl"}
                >
                  Firstname: {allimage.firstname} <br />
                  Lastname: {allimage.lastname}
                </Text>
              </Box>

              <Stack
                spacing={{ base: 4, sm: 6 }}
                direction={"column"}
                divider={
                  <StackDivider
                    borderColor={useColorModeValue("gray.200", "gray.600")}
                  />
                }
              >
                <VStack spacing={{ base: 4, sm: 6 }}>
                  <Text fontSize={"lg"}>
                    Lorem ipsum dolor sit amet consectetur.
                  </Text>
                </VStack>
                <Box>
                  <Text
                    fontSize={{ base: "16px", lg: "18px" }}
                    color={useColorModeValue("yellow.500", "yellow.300")}
                    fontWeight={"500"}
                    textTransform={"uppercase"}
                    mb={"4"}
                  >
                    Features
                  </Text>

                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                    <List spacing={2}>
                      <ListItem>Chronograph</ListItem>
                      <ListItem>Master Chronometer Certified</ListItem>{" "}
                      <ListItem>Tachymeter</ListItem>
                    </List>
                    <List spacing={2}>
                      <ListItem>Anti‑magnetic</ListItem>
                      <ListItem>Chronometer</ListItem>
                      <ListItem>Small seconds</ListItem>
                    </List>
                  </SimpleGrid>
                </Box>
                <Box>
                  <Text
                    fontSize={{ base: "16px", lg: "18px" }}
                    color={useColorModeValue("yellow.500", "yellow.300")}
                    fontWeight={"500"}
                    textTransform={"uppercase"}
                    mb={"4"}
                  >
                    Product Details <br />
                    {allimage.role}
                  </Text>

                  <List spacing={2}>
                    <ListItem>
                      <Text as={"span"} fontWeight={"bold"}>
                        Between lugs:
                      </Text>{" "}
                      20 mm
                    </ListItem>
                  </List>
                </Box>
              </Stack>

              <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Describe your problem</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <FormControl>
                      <FormLabel>Title</FormLabel>
                      <Input
                        placeholder="title"
                        onChange={(e) => settitle(e.target.value)}
                      />
                    </FormControl>
                    <br />
                    <FormLabel>Description</FormLabel>

                    <Textarea
                      rows={6}
                      placeholder="Enter your problem..."
                      onChange={(e) => setdesc(e.target.value)}
                    />
                  </ModalBody>
                  <ModalFooter>
                    {isLoading ? (
                      <Spinner />
                    ) : (
                      <Button colorScheme="blue" onClick={handledata}>
                        Submit
                      </Button>
                    )}
                  </ModalFooter>
                </ModalContent>
              </Modal>

              <Button
                rounded={"none"}
                w={"full"}
                mt={8}
                size={"lg"}
                py={"7"}
                bg={useColorModeValue("gray.900", "gray.50")}
                color={useColorModeValue("white", "gray.900")}
                textTransform={"uppercase"}
                _hover={{
                  transform: "translateY(2px)",
                  boxShadow: "lg",
                }}
                onClick={onOpen}
              >
                Send a connection Request
                {/* {user} */}
              </Button>
            </Stack>
          </SimpleGrid>
        </Container>
      </div>
    </>
  );
}

export default Lspdetails;
