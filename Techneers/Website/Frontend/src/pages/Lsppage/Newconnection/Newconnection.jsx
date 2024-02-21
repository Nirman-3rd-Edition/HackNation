import React, { useEffect, useState } from "react";
import LspNavbar from "../../../components/Topnavbar/LspNavbar/LspNavbar";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
  HStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import {
  getcasedetails,
  lspcheck,
  caseupdate,
  caseupdatee,
} from "../../../Routes/APIRoutes.js";
import { Link } from "react-router-dom";

const Newconnection = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [data, setdata] = useState([]);
  const [userid, setuserid] = useState("");
  const [status, setstatus] = useState("");
  const [appointmentdate, setappointmentdate] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [caseId, setCaseId] = useState(null);

  const handlecasedetails = async (id) => {
    try {
      // Fetch notifications from the server
      const response = await axios.get(`${getcasedetails}/${id}`);
      console.log(response.data);
      setdata(response.data.caseDetails);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };
  const getlsp = async () => {
    const token = localStorage.getItem("lsptoken");
    console.log(token);
    try {
      const response = await axios.get(lspcheck, {
        headers: {
          lsptoken: `${token}`,
        },
      });

      console.log("Data from server:", response.data);
      setuserid(response.data.lspId);
      handlecasedetails(response.data.lspId);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getlsp();
  }, []);

  const handleaccept = async (caseid) => {
    console.log(caseid.caseId);
    console.log(appointmentdate);
    try {
      const response = await axios.post(`${caseupdate}/${caseid.caseId}`, {
        appointmentdate,
      });
      console.log(response.data);
      setstatus(response.data.message);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const handleButtonClick = async (caseid) => {
    setCaseId(caseid);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Optionally, reset the caseId when the modal is closed
    setCaseId(null);
  };
  const handlereject = async (caseid) => {
    console.log(caseid);
    try {
      const response = await axios.post(`${caseupdatee}/${caseid}`);
      console.log(response.data.message);
      setstatus(response.data.message);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  return (
    <div>
      <LspNavbar />
      <TableContainer>
        <Table variant="simple" width="100%">
          <Thead>
            <Tr>
              <Th>Sl no</Th>
              <Th>Case Id</Th>
              <Th>USer ID</Th>
              <Th>Title</Th>
              <Th>Description</Th>

              <Th>Status</Th>
              <Th>Appointment Date</Th>
              <Th>Action</Th>
              <Th>Connect Now</Th>
            </Tr>
          </Thead>

          <Tbody>
            {data.map((card, index) => (
              <Tr>
                <Td>{index + 1}</Td>
                <Td>{card._id}</Td>
                <Td>{card.userid}</Td>
                <Td>{card.title}</Td>
                <Td>{card.desc}</Td>

                <Td>
                  {card.accept == "0" ? (
                    <p className="p-3 text-xs font-bold uppercase tracking-wider text-black-300 bg-red-600 rounded-lg bg-opacity-50">
                      Pending
                    </p>
                  ) : (
                    <p className="p-3 text-xs font-bold uppercase tracking-wider text-black-300 bg-green-600 rounded-lg bg-opacity-50">
                      Accepted
                    </p>
                  )}
                </Td>

                <Td>{card.appointmentdate}</Td>

                <Td>
                  <HStack spacing="2">
                    <Button
                      colorScheme="green"
                      size="sm"
                      onClick={() => handleButtonClick(`${card._id}`)}
                    >
                      Approve
                    </Button>

                    <Button
                      colorScheme="red"
                      size="sm"
                      onClick={() => handlereject(`${card._id}`)}
                    >
                      Reject
                    </Button>
                  </HStack>
                </Td>
                <Td>
                  {card.payment == "0" ? (
                    <Button isDisabled colorScheme="blue">
                      Conenct Now
                    </Button>
                  ) : (
                    <Link to="/videocall">
                      <Button colorScheme="blue">Conenct Now</Button>
                    </Link>
                  )}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        <Modal isOpen={isModalOpen} onClose={handleCloseModal} isCentered>
          <ModalOverlay />

          <ModalContent>
            <ModalHeader>
              <b>Select The Date and Time</b>
            </ModalHeader>
            <ModalCloseButton />

            <ModalBody>
              <input
                type="datetime-local"
                name="date"
                onChange={(e) => setappointmentdate(e.target.value)}
              />
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={handleCloseModal}>
                Close
              </Button>
              <Button
                colorScheme="whatsapp"
                onClick={() => handleaccept({ caseId })}
              >
                Update
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </TableContainer>
    </div>
  );
};

export default Newconnection;
