import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Button, Container, Grid, VStack, Text } from "@chakra-ui/react";

import { Link } from "react-router-dom";
import Navbar from "../../../components/Navbar";

const LoginChoice = () => {
  return (
    <>
      <Navbar />
      <div style={{ backgroundColor: "#131324" }}>
        <Container>
          <Grid minH={"90vh"} alignItems={"center"}>
            <VStack direction="row" spacing={4}>
              <Link to={"/userlogin"}>
                <Button
                  colorScheme="cyan"
                  variant="solid"
                  w={"300px"}
                  rightIcon={<ArrowForwardIcon />}
                  _hover={{ bgGradient: "linear(to-r, #FFD700, #FF8C00)" }}
                >
                  Sign In as a User
                </Button>
              </Link>
              <Text
                bgGradient="linear(to-r, #FF8C00, #FFD700)"
                backgroundClip="text"
                fontWeight="bold"
                fontSize="xl"
              >
                {" "}
                Or{" "}
              </Text>
              <Link to={"/lsplogin"}>
                <Button
                  colorScheme="cyan"
                  variant="solid"
                  _hover={{ bgGradient: "linear(to-r, #FFD700, #FF8C00)" }}
                  w={"300px"}
                  rightIcon={<ArrowForwardIcon />}
                >
                  Sign In as a Legal Service Provider
                </Button>
              </Link>
              <Text
                bgGradient="linear(to-r, #FF8C00, #FFD700)"
                backgroundClip="text"
                fontWeight="bold"
                fontSize="xl"
              >
                {" "}
                Or{" "}
              </Text>
              <Link to={"/agentlogin"}>
                <Button
                  colorScheme="cyan"
                  variant="solid"
                  _hover={{ bgGradient: "linear(to-r, #FFD700, #FF8C00)" }}
                  w={"300px"}
                  rightIcon={<ArrowForwardIcon />}
                >
                  Sign In as Agent
                </Button>
              </Link>
              <Text
                bgGradient="linear(to-r, #FF8C00, #FFD700)"
                backgroundClip="text"
                fontWeight="bold"
                fontSize="xl"
              >
                {" "}
                Or{" "}
              </Text>
              <Link to={"/adminlogin"}>
                <Button
                  colorScheme="cyan"
                  variant="solid"
                  _hover={{ bgGradient: "linear(to-r, #FFD700, #FF8C00)" }}
                  w={"300px"}
                  rightIcon={<ArrowForwardIcon />}
                >
                  Sign In as Admin
                </Button>
              </Link>
            </VStack>
          </Grid>
        </Container>
      </div>
    </>
  );
};

export default LoginChoice;
