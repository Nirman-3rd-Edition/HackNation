import { useEffect, useState } from "react";
// import { Link } from "react-scroll";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { AiOutlineMenu } from "react-icons/ai";
import Button from "../../../layouts/Button";
import { Avatar, Badge, Box, IconButton, VStack } from "@chakra-ui/react";
import axios from "axios";
import { getuserdetails, usercheck } from "../../../Routes/APIRoutes.js";
import { BellIcon } from "@chakra-ui/icons";

const UserNavbar = () => {
  const [menu, setMenu] = useState(false);
  const [name, setname] = useState([]);
  const navigate = useNavigate();

  const handleChange = () => {
    setMenu(!menu);
  };
  const toastOptions = {
    position: "bottom-right",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const getuserdetailss = async (id) => {
    try {
      const getuserdetailss = getuserdetails;
      const response = await axios.get(`${getuserdetailss}/${id}`);

      console.log(response.data);
      setname(response.data.user);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const getuser = async () => {
    const token = localStorage.getItem("token");
    console.log(token);
    try {
      const response = await axios.get(usercheck, {
        headers: {
          token: `${token}`, // Replace with your actual JWT token
        }, // Include credentials (cookies, authorization headers)
      });

      console.log("Data from server:", response.data);
      getuserdetailss(response.data.userId);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getuser();
  }, []);

  const logout = async () => {
    await localStorage.removeItem("token");
    await toast.success("successfully logout", toastOptions);

    setTimeout(() => {
      navigate("/");
    }, 1000);
  };
  const backgroundColor = `bg-white`;

  return (
    <div>
      <div className=" flex flex-row justify-between p-5 md:px-32 px-5 bg-darkBackground text-white">
        <div className=" flex items-center">
          <Link to="/" spy={true} smooth={true} duration={500}>
            <h1 className=" font-semibold text-4xl cursor-pointer">
              NyayMitra
            </h1>
          </Link>
        </div>
        <nav className="hidden lg:flex flex-row items-center gap-6">
          <Link
            to="/userwelcome"
            spy={true}
            smooth={true}
            duration={500}
            className=" hover:text-brightColor transition-all cursor-pointer"
          >
            Home
          </Link>
          <Link
            to="/choice"
            spy={true}
            smooth={true}
            duration={500}
            className=" hover:text-brightColor transition-all cursor-pointer"
          >
            LSPs
          </Link>
          <Link
            to="/unknownchoice"
            spy={true}
            smooth={true}
            duration={500}
            className=" hover:text-brightColor transition-all cursor-pointer"
          >
            Unknown LSPs
          </Link>
          <Link
            to="/userconnection"
            spy={true}
            smooth={true}
            duration={500}
            className=" hover:text-brightColor transition-all cursor-pointer"
          >
            Status
          </Link>
          <Link
            to="contact"
            spy={true}
            smooth={true}
            duration={500}
            className=" hover:text-brightColor transition-all cursor-pointer"
          >
            Contact
          </Link>
        </nav>

        <div className="hidden lg:flex flex-row items-center gap-4">
          <span className="hover:text-brightColor transition-all cursor-pointer">
            <h1>
              Hi ! ({name.firstname}
              <span> </span>
              {name.lastname})
              <Avatar
                size="sm"
                name="Dan Abrahmov"
                src="https://bit.ly/dan-abramov"
              />
            </h1>
          </span>

          <IconButton
            aria-label="Notifications"
            icon={
              <Box
                position="relative"
                // Set your dark background color here
                _hover={{ bgGradient: "linear(to-r, #FFD700, #FF8C00)" }}
              >
                <BellIcon
                  boxSize={8}
                  color="red"
                  // onClick={() => handleAvatarClick()}
                />
                {/* {notificationCount > 0 && ( */}
                <Badge
                  position="absolute"
                  top="0"
                  right="0"
                  colorScheme="red"
                  borderRadius="full"
                  _hover={{ bgGradient: "linear(to-r, #FFD700, #FF8C00)" }}
                >
                  {/* {notificationCount} */}
                  {2}
                </Badge>
                {/* )} */}
                <VStack spacing={4}>
                  {/* {selectedicon && ( */}
                  {/* <Box
                    // Set the desired width
                    padding="4"
                    backgroundColor="white"
                    boxShadow="md"
                    position="absolute"
                    top="200px"
                    left={["50%", "50%", "50%", "50%"]}
                    transform="translate(-50%, -50%)"
                    zIndex="999"
                    overflowY="auto"
                    maxHeight="40vh"
                  > */}
                  {/* <h1>
                      All Messages Here
                      <p
                        style={{
                          textAlign: "right",
                          color: "blue",
                        }}
                        cursor="pointer"
                        // onClick={handleCloseMessage}
                      >
                        Close
                      </p>
                    </h1> */}
                  {/* 
                    <hr></hr>
                    <Link to="/lspnewconnection">
                      <Button
                        title="Click Here"
                        backgroundColor={backgroundColor}
                      />
                    </Link> */}
                  {/* <Text
                        color="blue.500"
                        cursor="pointer"
                        onClick={handleCloseMessage}
                        align="right"
                      >
                        Close
                      </Text> */}
                  {/* {data.map((card) => (
                      <div>
                        <Text fontSize="lg">({card.senderId})</Text>

                        <Text fontSize="md">{card.message}</Text>
                        <Divider />
                        <br />
                      </div>
                    ))} */}
                  {/* </Box> */}
                  {/* )} */}
                </VStack>
              </Box>
            }
            size="lg"
            backgroundColor="#131324"
            _hover={{ bgGradient: "linear(to-r, #FFD700, #FF8C00)" }}
          />

          <Button
            title="Log Out"
            backgroundColor={backgroundColor}
            onClick={logout}
          />

          <ToastContainer />
        </div>

        <div
          className=" lg:hidden flex items-center p-2"
          onClick={handleChange}
        >
          <AiOutlineMenu size={25} />
        </div>
      </div>
      <div
        className={` ${
          menu ? "translate-x-0" : "-translate-x-full"
        } lg:hidden flex flex-col absolute bg-darkBackground text-white left-0 top-20 font-semibold text-2xl text-center pt-8 pb-4 gap-8 w-full h-fit transition-transform duration-300`}
      >
        <Link
          to="home"
          spy={true}
          smooth={true}
          duration={500}
          className=" hover:text-brightColor transition-all cursor-pointer"
        >
          Home
        </Link>
        <Link
          to="features"
          spy={true}
          smooth={true}
          duration={500}
          className=" hover:text-brightColor transition-all cursor-pointer"
        >
          Features
        </Link>
        <Link
          to="destination"
          spy={true}
          smooth={true}
          duration={500}
          className=" hover:text-brightColor transition-all cursor-pointer"
        >
          Destination
        </Link>
        <Link
          to="about"
          spy={true}
          smooth={true}
          duration={500}
          className=" hover:text-brightColor transition-all cursor-pointer"
        >
          About
        </Link>
        <Link
          to="contact"
          spy={true}
          smooth={true}
          duration={500}
          className=" hover:text-brightColor transition-all cursor-pointer"
        >
          Contact
        </Link>

        <div className="flex flex-col lg:hidden lg:flex-row items-center gap-4">
          <Link to="login">
            <h1 className="hover:text-brightColor transition-all cursor-pointer">
              Register
            </h1>
          </Link>

          <Button
            title="Log Out"
            backgroundColor={backgroundColor}
            onClick={logout}
          />
        </div>
      </div>
    </div>
  );
};

export default UserNavbar;
