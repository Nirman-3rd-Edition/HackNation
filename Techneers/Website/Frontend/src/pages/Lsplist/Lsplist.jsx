import React, { useEffect, useState } from "react";

import {
  Grid,
  GridItem,
  VStack,
  Text,
  InputGroup,
  InputLeftElement,
  Input,
  Heading,
  Flex,
  Checkbox,
  Spacer,
  Button,
  Box,
} from "@chakra-ui/react";
import ProfileCard from "../../components/Cards/ProfileCard";
import { lsplist } from "../../Routes/APIRoutes.js";
import { PhoneIcon, Search2Icon, ViewIcon } from "@chakra-ui/icons";
import UserNavbar from "../../components/Topnavbar/UserNavbar/UserNavbar";
import { useParams } from "react-router-dom";
import axios from "axios";

const Lsplist = () => {
  const [cardData, setcardData] = useState([]);
  const { role } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const getsearchdetails = async (role) => {
    try {
      const lsplists = lsplist;
      const response = await axios.get(`${lsplists}/${role}`);

      console.log(response.data);
      setcardData(response.data);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };
  useEffect(() => {
    getsearchdetails(role);
  }, [role]);

  // State for filter options
  const uniqueCategories = Array.from(
    new Set(cardData.map((card) => card.firstname))
  );
  const filteredCards = cardData.filter((card) => {
    if (selectedCategory === "all") {
      return true; // Show all cards if no category is selected
    }
    return card.category === selectedCategory;
  });
  const searchedCards = filteredCards.filter((card) =>
    card.firstname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <UserNavbar />

      <VStack m={8}>
        <Grid templateColumns={{ base: "1fr", md: "20% 80%" }} gap={8} m={4}>
          <GridItem
            overflowY="auto"
            overflowX="auto"
            w="80%"
            wordWrap="break-word"
          >
            <Heading fontWeight={"bold"} fontSize={"x-large"}>
              Filters
            </Heading>
            <VStack spacing={5} direction="row" mt={8}>
              <Heading fontWeight={"bold"} fontSize={"larger"}>
                Category
              </Heading>
              <Checkbox colorScheme="green" defaultChecked>
                All
              </Checkbox>
              <Checkbox colorScheme="green" defaultChecked>
                Criminal
              </Checkbox>
              <Checkbox colorScheme="green" defaultChecked>
                Maritial
              </Checkbox>
              <Checkbox colorScheme="green" defaultChecked>
                Civil
              </Checkbox>
            </VStack>
            <VStack spacing={5} direction="row" mt={8}>
              <Heading fontWeight={"bold"} fontSize={"larger"}>
                Win Ratio
              </Heading>
              <Checkbox colorScheme="green" defaultChecked>
                All
              </Checkbox>
              <Checkbox colorScheme="green" defaultChecked>
                >= 90%
              </Checkbox>
              <Checkbox colorScheme="green" defaultChecked>
                >= 80%
              </Checkbox>
              <Checkbox colorScheme="green" defaultChecked>
                >= 70%
              </Checkbox>
            </VStack>
            <VStack spacing={5} direction="row" mt={8}>
              <Heading fontWeight={"bold"} fontSize={"larger"}>
                Rating
              </Heading>

              <Checkbox colorScheme="green" defaultChecked>
                All
              </Checkbox>
              <Checkbox colorScheme="green" defaultChecked>
                >= 4
              </Checkbox>
              <Checkbox colorScheme="green" defaultChecked>
                >= 3
              </Checkbox>
              <Checkbox colorScheme="green" defaultChecked>
                >= 2
              </Checkbox>
            </VStack>
            <VStack spacing={5} direction="row" mt={8}>
              <Heading fontWeight={"bold"} fontSize={"larger"}>
                Loaction
              </Heading>
              <InputGroup w={48}>
                <InputLeftElement pointerEvents="none">
                  <PhoneIcon color="gray.300" />
                </InputLeftElement>
                <Input type="text" placeholder="Enter Your Location" />
              </InputGroup>
              <Button variant={"solid"} rightIcon={<ViewIcon />}>
                Use Current Loaction
              </Button>
            </VStack>
          </GridItem>

          <GridItem>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <Search2Icon color="gray.300" />
              </InputLeftElement>
              <Input
                type="text"
                placeholder="Search Here..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </InputGroup>
            <br />
            <Grid
              templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
              gap={4}
            >
              {searchedCards.map((card) => (
                <GridItem>
                  <ProfileCard
                    firstname={card.firstname}
                    lastname={card.lastname}
                    image={
                      "https://cdn1.vectorstock.com/i/1000x1000/83/15/lawyer-cartoon-vector-35528315.jpg"
                    }
                    desc={
                      "A legal professional dedicated to representing clients in court, providing expert advice, and advocating for their interests to ensure fair legal outcomes."
                    }
                    specification={"Criminal"}
                    winRatio={"90%"}
                    casehandled={200}
                    rating={4.3}
                    link={card._id}
                  />
                </GridItem>
              ))}
            </Grid>
          </GridItem>
        </Grid>
      </VStack>
      {/* <Footer /> */}
    </>
  );
};

export default Lsplist;
