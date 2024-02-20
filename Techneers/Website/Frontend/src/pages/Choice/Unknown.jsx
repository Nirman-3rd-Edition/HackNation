import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Container,
  Divider,
  Grid,
  GridItem,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Portal,
  Spinner,
  Stack,
  Text,
  Textarea,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";

import UserNavbar from "../../components/Topnavbar/UserNavbar/UserNavbar";
import ChoiceCard from "../../components/Cards/ChoiceCard";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Unknown() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [inputText, setInputText] = useState("");
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isOpen && !isLoading) {
      // Reset the input text and result when the modal is closed
      setInputText("");
      setResult("");
    }
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate an asynchronous operation (e.g., API call)
    try {
      // Replace this with your actual asynchronous operation
      //   await new Promise((resolve) => setTimeout(resolve, 2000));

      const response = await axios.post(
        "https://e-legalmart-ml-model.onrender.com/recommend",
        {
          user_input: inputText,
        }
      );

      if (response.status === 200) {
        console.log(response);
        setResult(response.data.recommendation);
      }

      // For simplicity, let's just reverse the input text
      //   const reversedText = inputText.split("").reverse().join("");
      //   setResult(reversedText);

      //   console.log("Result:", reversedText); // Log the result to the console

      onOpen(); // Open the result modal
    } catch (error) {
      console.error("Error processing input", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <UserNavbar />
      <div>
        <VStack m={8} justify="center" align="center">
          <Heading
            children="Unknown About Legal Service Provider"
            textAlign="center"
          />
          <br />
          <Grid gap={8}>
            <GridItem colStart="1" colEnd="1" mx="auto">
              <Card w={"60"}>
                <CardBody align="center" justify="center">
                  <Avatar
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAZpl1RUV7fHakOoKawPThDQeazIZLNf9bkA&usqp=CAU"
                    align="center"
                    justify="center"
                    size="2xl"
                  />
                  <Stack mt="6" spacing="3">
                    <Heading size="md">Unknown</Heading>
                  </Stack>
                  <br />
                  <Text color={"#9ba4b5"} textAlign={"justify"} fontSize={"sm"}>
                    A legal professional dedicated to representing clients in
                    court, providing expert advice, and advocating for their
                    interests to ensure fair legal outcomes.
                  </Text>
                </CardBody>
                <Divider />
                <CardFooter align="center" justify="center">
                  <Button variant="solid" colorScheme="purple" onClick={onOpen}>
                    Explore now
                  </Button>
                </CardFooter>
              </Card>
            </GridItem>
          </Grid>
        </VStack>

        <Modal isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Describe your problem</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Textarea
                placeholder="Enter your problem..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
            </ModalBody>
            <ModalFooter>
              {isLoading ? (
                <Spinner />
              ) : (
                <Button colorScheme="blue" onClick={handleSubmit}>
                  Submit
                </Button>
              )}
            </ModalFooter>
          </ModalContent>
        </Modal>

        <Modal
          isOpen={result !== ""}
          onClose={() => setResult("")}
          isCentered
          zIndex="1100"
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Our Recommendation</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Box>
                <Text>{result}</Text>
              </Box>
            </ModalBody>
            <ModalFooter gap={3}>
              <Button
                colorScheme="blue"
                onClick={() => setResult("")}
                size="lg"
              >
                Close
              </Button>
              <Link to={`/lsplist/${result}`}>
                <Button colorScheme="whatsapp" size="lg">
                  Click here
                </Button>
              </Link>
            </ModalFooter>
          </ModalContent>
        </Modal>

        {isLoading && (
          <Portal>
            <Box
              position="fixed"
              top="0"
              left="0"
              width="100%"
              height="100%"
              backgroundColor="rgba(255, 255, 255, 0.8)"
              display="flex"
              justifyContent="center"
              alignItems="center"
              zIndex="1500"
            >
              <Spinner size="xl" />
              <Text mt={3}>Loading...</Text>
            </Box>
          </Portal>
        )}

        {/* <Footer /> */}
      </div>
    </>
  );
}
