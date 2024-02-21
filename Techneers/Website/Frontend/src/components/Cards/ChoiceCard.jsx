import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Stack,
  Image,
  Text,
  Divider,
  Avatar,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const ChoiceCard = ({ title, desc, image, link }) => {
  return (
    <Card w={"60"}>
      <CardBody align="center" justify="center">
        <Avatar src={image} align="center" justify="center" size="2xl" />
        <Stack mt="6" spacing="3">
          <Heading size="md">{title}</Heading>
        </Stack>
        <br />
        <Text color={"#9ba4b5"} textAlign={"justify"} fontSize={"sm"}>
          {desc}
        </Text>
      </CardBody>
      <Divider />
      <CardFooter align="center" justify="center">
        <Link to={`/lsplist/${link}`}>
          <Button variant="solid" colorScheme="purple">
            Explore now
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ChoiceCard;
