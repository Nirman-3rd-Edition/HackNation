import React from "react";
import {
  Card,
  CardBody,
  Avatar,
  Stack,
  Heading,
  Text,
  CardFooter,
  Divider,
  Image,
} from "@chakra-ui/react";

import crown from "../../assets/crown.png";

const AchieversCard = ({ image, title, rank, desc }) => {
  return (
    <>
      <Card w={"sm"} m={8}>
        <CardBody align="center" justify="center">
          <Image src={crown} w={44} />
          <Avatar src={image} align="center" justify="center" size="2xl" />
          <Stack mt="6" spacing="3">
            <Heading size="md">{title}</Heading>
          </Stack>
          <br />
          <Text fontSize={"5xl"} align="center" justify="center">
            {rank}
          </Text>
        </CardBody>
        <Divider />
        <CardFooter color={"#9ba4b5"} textAlign={"justify"}>
          {desc}
        </CardFooter>
      </Card>
    </>
  );
};

export default AchieversCard;
