import React from "react";
import {
  Card,
  CardBody,
  Stack,
  Heading,
  Image,
  Text,
  Divider,
  Button,
  ButtonGroup,
  CardFooter,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const ProfileCard = ({
  image,
  firstname,
  lastname,
  desc,
  casehandled,
  specification,
  winRatio,
  rating,
  link,
}) => {
  return (
    <Card maxW="sm">
      <CardBody>
        <Image src={image} borderRadius="lg" />
        <Stack mt="6" spacing="3">
          <Heading size="md">
            {firstname}
            {lastname}
          </Heading>
          <Text>{specification}</Text>
          <Text>{desc}</Text>
          <Text color="purple.600" fontSize="l">
            Rating : {rating}
          </Text>
          <Text color="purple.600" fontSize="l">
            Case Handled :{casehandled}
          </Text>
          <Text color="purple.600" fontSize="l">
            Win Ratio : {winRatio}
          </Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <ButtonGroup spacing="2">
          <Link to={`/lspdetails/${link}`}>
            <Button variant="solid" colorScheme="purple">
              Contact Now
            </Button>
          </Link>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};

export default ProfileCard;
