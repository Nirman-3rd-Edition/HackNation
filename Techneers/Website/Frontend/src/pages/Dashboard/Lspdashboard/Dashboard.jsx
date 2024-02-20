import React from "react";
import {
  ChakraProvider,
  CSSReset,
  extendTheme,
  Box,
  Flex,
  VStack,
  Text,
} from "@chakra-ui/react";

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

const Dashboard = () => {
  // Sample counts for legal service providers
  const providerCounts = {
    "no of cases": 25,
    "solved cases": 15,
    "pending cases": 10,
    "approve cases": 20,
    "others Info": 12,
    "Revenue Generated": 305630,
  };

  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <VStack spacing={["4", "8"]} align="center" padding={["20px", "40px"]}>
        <Text fontSize="xl" fontWeight="bold" color="white">
          Legal Service Providers Overview
        </Text>
        <Flex
          justify={["center", "space-between"]}
          wrap={["wrap", "wrap", "nowrap"]}
          spacing={["4", "8", "16"]}
          gap={8}
        >
          {Object.entries(providerCounts).map(([provider, count]) => (
            <Box
              key={provider}
              width={["90%", "45%", "30%"]}
              textAlign="center"
              p="4"
              borderWidth="1px"
              borderRadius="lg"
              boxShadow="md"
              marginBottom={["4", "4", "0"]}
              _hover={{
                transform: "scale(1.05)",
                transition: "transform 0.3s ease-in-out",
                cursor: "pointer",
                boxShadow: "lg",
              }}
            >
              <Text fontSize="2xl" fontWeight="bold" mb="2" color="white">
                {provider.charAt(0).toUpperCase() + provider.slice(1)}
              </Text>
              <Text fontSize="l" color="white">
                {count}
              </Text>
            </Box>
          ))}
        </Flex>
      </VStack>
    </ChakraProvider>
  );
};

export default Dashboard;
