import { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
// import Logo from "../assets/logo.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../../../components/Navbar";
import {
  lspregisterRoute,
  otpRoute,
  verifyotpRoute,
  upload,
} from "../../../Routes/APIRoutes.js";
import {
  FormControl,
  HStack,
  Button,
  Heading,
  useColorModeValue,
  Select,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Center,
  PinInput,
  PinInputField,
  Spinner,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";

export default function LspRegister() {
  const navigate = useNavigate();
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [phoneno, setphoneno] = useState("");
  const [email, setEmail] = useState("");
  const [role, setrole] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [pin, setPin] = useState("");
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [verificationMessage, setVerificationMessage] = useState("");
  const [file, setFile] = useState(null);
  const [fileid, setfileid] = useState();

  const sendotp = async () => {
    setIsLoading(true);

    try {
      const response = await axios.post(otpRoute, {
        email,
      });

      toast.success("Otp Send Successfully", toastOptions);

      setIsLoading(false);
      console.log(response);
      onOpen();
    } catch (error) {
      toast.error("Error From Server side ", toastOptions);
      onClose();
    }
  };

  const handleVerify = async () => {
    // e.preventDefault();
    console.log(otp);
    try {
      const response = await axios.post(verifyotpRoute, {
        email,
        otp,
      });
      toast.success("Otp Verified Successfully", toastOptions);
      setVerificationMessage("OTP Verified");
      setIsVerified(true);
      onClose();
      console.log(response);
    } catch (error) {
      setVerificationMessage("Invalid OTP");
      toast.error("Invalid Otp", toastOptions);
    }
  };

  const handleValidation = () => {
    if (email === "" || firstname === "" || lastname === "") {
      toast.error("Enter the required field.", toastOptions);
      return false;
    } else if (isVerified == false) {
      toast.error("Email Should be Verified", toastOptions);
      return false;
    } else if (password.length < 8) {
      toast.error(
        "Password should be equal or greater than 8 characters.",
        toastOptions
      );
      return false;
    } else if (password !== confirmPassword) {
      toast.error(
        "Password and confirm password should be same.",
        toastOptions
      );
      return false;
    }

    return true;
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(upload, formData);

      console.log("File uploaded:", response.data);
      setfileid(response.data._id);
      toast.success("file upload successfully", toastOptions);
    } catch (error) {
      console.error("Error uploading file:", error.message);
      toast.error("server error", toastOptions);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      try {
        await handleUpload();
        const response = await axios.post(lspregisterRoute, {
          firstname,
          lastname,
          email,
          role,
          password,
          phoneno,
          fileid,
        });
        console.log(response);
        if (response.data.message == "LSP registered successfully") {
          await toast.success("Lsp registered successfully", {
            ...toastOptions,
          });

          // setTimeout(() => {
          //   navigate("/userlogin");
          // }, 3000);
        }
      } catch (error) {
        toast.error("User Already Exists", toastOptions);
        console.error("Login failed:", error);
      }
    }
  };

  return (
    <>
      <Navbar />
      <FormContainer>
        <form action="" onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            {/* <img src={Logo} alt="logo" /> */}
            <h1>Lsp Register Here</h1>
          </div>
          <p style={{ color: "white" }}>Firstname</p>
          <input
            type="text"
            placeholder="Firstname"
            name="username"
            onChange={(e) => setfirstname(e.target.value)}
          />
          <p style={{ color: "white" }}>Lastname</p>
          <input
            type="text"
            placeholder="Lastname"
            name="username"
            onChange={(e) => setlastname(e.target.value)}
          />
          <p style={{ color: "white" }}>Email</p>
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <span>
            {" "}
            <Button
              onClick={sendotp}
              disabled={isLoading || isVerified}
              size="sm"
              style={{
                backgroundColor: isVerified ? "green" : "#4e0eff",
              }}
            >
              {isLoading ? (
                <Spinner size="sm" />
              ) : isVerified ? (
                "Verified Email"
              ) : (
                "Verify"
              )}
            </Button>
          </span>

          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader></ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Center>
                  <Heading
                    lineHeight={1.1}
                    fontSize={{ base: "2xl", md: "3xl" }}
                    mt={2}
                  >
                    Verify your Email
                  </Heading>
                </Center>
                <Center
                  fontSize={{ base: "sm", sm: "md" }}
                  color={useColorModeValue("gray.800", "gray.400")}
                  mt={3}
                >
                  We have sent code to your email & expire in 5 minutes.
                </Center>
                <Center
                  fontSize={{ base: "sm", sm: "md" }}
                  fontWeight="bold"
                  color={useColorModeValue("gray.800", "gray.400")}
                  mt={3}
                  mb={6}
                >
                  {email}
                </Center>
                <FormControl>
                  <Center>
                    <HStack>
                      <PinInput>
                        {[1, 2, 3, 4, 5, 6].map((_, index) => (
                          <PinInputField
                            key={index}
                            type="text"
                            value={pin[index] || ""}
                            onChange={(e) => {
                              const newPin = [...pin];
                              newPin[index] = e.target.value;
                              setPin(newPin);
                              const otpp = newPin.join("");
                              console.log(otpp);
                              setOtp(otpp);
                            }}
                            style={{
                              borderColor: "blue",
                              borderWidth: "2px",
                            }}
                            focusBorderColor="blue.500" // Border color when input is focused
                            errorBorderColor="red.500" // Border color when there's an error
                          />
                        ))}
                      </PinInput>
                    </HStack>
                  </Center>
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <p>{verificationMessage}</p>
                <Button variant="ghost" mt={3} mr={3} onClick={onClose}>
                  Close
                </Button>
                <Button colorScheme="blue" onClick={handleVerify}>
                  Verify
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>

          <p style={{ color: "white" }}>Password</p>

          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <p style={{ color: "white" }}>Confirm Password</p>
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={(e) => setconfirmPassword(e.target.value)}
          />
          <p style={{ color: "white" }}>Select The Role</p>
          <Select
            placeholder="Select The Role"
            onChange={(e) => {
              setrole(e.target.value);
            }}
            style={{
              color: "white",
              border: "0.1rem solid #4e0eff",
            }}
          >
            <option value="Advocate" style={{ color: "black" }}>
              Advocate
            </option>
            <option value="Arbitrator" style={{ color: "black" }}>
              Arbitrator
            </option>
            <option value="Mediator" style={{ color: "black" }}>
              Mediator
            </option>
            <option value="Notary" style={{ color: "black" }}>
              Notary
            </option>
            <option value="document writer" style={{ color: "black" }}>
              {" "}
              Document Writer
            </option>
          </Select>
          <p style={{ color: "white" }}>Phone Number</p>
          <input
            type="number"
            placeholder="Phone Number"
            name="Phone Number"
            onChange={(e) => setphoneno(e.target.value)}
          />

          <p style={{ color: "white" }}>Document Proof</p>

          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
          {/* <button onClick={handleUpload}>Upload</button> */}

          <button type="submit">Sign Up</button>
          <span>
            Already have an account ? <Link to="/lsplogin">Login Here.</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}

const FormContainer = styled.div`
  padding-top: 30px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
      font-size: 40px;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }

  button {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;
