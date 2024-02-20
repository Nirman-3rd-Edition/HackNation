import React, { useState } from "react";
import {
  ChakraProvider,
  CSSReset,
  extendTheme,
  VStack,
  Text,
  Box,
  Input,
  Textarea,
  Button,
  InputGroup,
  InputLeftAddon,
  FormControl,
  FormLabel,
  FormErrorMessage,
  HStack,
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

const SubmitComplaints = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    serviceProviderName: "",
    serviceProviderType: "",
    description: "",
    date: "",
    remarks: "",
  });

  const [formErrors, setFormErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    // Clear the error for the field when it is updated
    setFormErrors({ ...formErrors, [field]: "" });
  };

  const handleSubmit = () => {
    // Basic form validation
    const errors = {};
    if (!formData.name.trim()) {
      errors.name = "Name is required";
    }
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Invalid email address";
    }
    if (!formData.phone.trim()) {
      errors.phone = "Phone is required";
    }
    if (!formData.serviceProviderName.trim()) {
      errors.serviceProviderName = "Service Provider Name is required";
    }
    if (!formData.serviceProviderType.trim()) {
      errors.serviceProviderType = "Service Provider Type is required";
    }
    if (!formData.description.trim()) {
      errors.description = "Description is required";
    }
    if (!formData.date.trim()) {
      errors.date = "Date is required";
    }
    setFormErrors(errors);

    // If there are no errors, proceed with form submission
    if (Object.keys(errors).length === 0) {
      // Handle submission logic here
      console.log("Form Data:", formData);
    }
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      serviceProviderName: "",
      serviceProviderType: "",
      description: "",
      date: "",
      remarks: "",
    });
    setFormErrors({});
  };

  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <div
        style={{
          marginLeft: "20rem",
          border: "2px solid red",
          width: "500px",
          position: "absolute",
        }}
      >
        <VStack spacing="4" align="center" padding={["30px", "50px"]}>
          <Text fontSize="xl" fontWeight="bold" color="white">
            Submit Complaints
          </Text>
          <Box width="100%">
            <FormControl isInvalid={!!formErrors.name}>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                placeholder="Enter your name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
              />
              <FormErrorMessage>{formErrors.name}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!formErrors.email} mt="4">
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
              />
              <FormErrorMessage>{formErrors.email}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!formErrors.phone} mt="4">
              <FormLabel>Phone</FormLabel>
              <Input
                type="tel"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
              />
              <FormErrorMessage>{formErrors.phone}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!formErrors.serviceProviderName} mt="4">
              <FormLabel>Service Provider Name</FormLabel>
              <Input
                type="text"
                placeholder="Enter service provider name"
                value={formData.serviceProviderName}
                onChange={(e) =>
                  handleInputChange("serviceProviderName", e.target.value)
                }
              />
              <FormErrorMessage>
                {formErrors.serviceProviderName}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!formErrors.serviceProviderType} mt="4">
              <FormLabel>Service Provider Type</FormLabel>
              <Input
                type="text"
                placeholder="Enter service provider type"
                value={formData.serviceProviderType}
                onChange={(e) =>
                  handleInputChange("serviceProviderType", e.target.value)
                }
              />
              <FormErrorMessage>
                {formErrors.serviceProviderType}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!formErrors.description} mt="4">
              <FormLabel>Description</FormLabel>
              <Textarea
                placeholder="Enter complaint description"
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
              />
              <FormErrorMessage>{formErrors.description}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!formErrors.date} mt="4">
              <FormLabel>Date</FormLabel>
              <Input
                type="date"
                value={formData.date}
                onChange={(e) => handleInputChange("date", e.target.value)}
              />
              <FormErrorMessage>{formErrors.date}</FormErrorMessage>
            </FormControl>
            <FormControl mt="4">
              <FormLabel>Remarks</FormLabel>
              <Textarea
                placeholder="Enter additional remarks"
                value={formData.remarks}
                onChange={(e) => handleInputChange("remarks", e.target.value)}
              />
            </FormControl>
          </Box>
          <HStack spacing="2" mt="4">
            <Button colorScheme="teal" onClick={handleSubmit}>
              Submit
            </Button>
            <Button colorScheme="red" onClick={handleReset}>
              Reset
            </Button>
          </HStack>
        </VStack>
      </div>
    </ChakraProvider>
  );
};

export default SubmitComplaints;
