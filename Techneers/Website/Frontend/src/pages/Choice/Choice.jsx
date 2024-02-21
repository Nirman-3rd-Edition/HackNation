import { Container, Grid, GridItem, Heading, VStack } from "@chakra-ui/react";

import UserNavbar from "../../components/Topnavbar/UserNavbar/UserNavbar";
import ChoiceCard from "../../components/Cards/ChoiceCard";

export default function Choice() {
  return (
    <>
      <UserNavbar />
      <div>
        <VStack m={8}>
          <Heading
            children="Choose Your Required Legal Service Provider"
            textAlign="center"
          />
          <br />
          <Grid
            templateColumns={{
              base: "1fr",
              md: "repeat(2, 1fr)",
              lg: "repeat(5, 1fr)",
            }}
            gap={8}
          >
            <GridItem>
              <ChoiceCard
                title={"Advocates"}
                desc={
                  "A legal professional dedicated to representing clients in court, providing expert advice, and advocating for their interests to ensure fair legal outcomes."
                }
                image={
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAZpl1RUV7fHakOoKawPThDQeazIZLNf9bkA&usqp=CAU"
                }
                link={"Advocate"}
              />
            </GridItem>
            <GridItem>
              <ChoiceCard
                title={"Arbitrators"}
                desc={
                  "A legal professional dedicated to representing clients in court, providing expert advice, and advocating for their interests to ensure fair legal outcomes."
                }
                image={
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAZpl1RUV7fHakOoKawPThDQeazIZLNf9bkA&usqp=CAU"
                }
                link={"Arbitrator"}
              />
            </GridItem>
            <GridItem>
              <ChoiceCard
                title={"Mediators"}
                desc={
                  "A legal professional dedicated to representing clients in court, providing expert advice, and advocating for their interests to ensure fair legal outcomes."
                }
                image={
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAZpl1RUV7fHakOoKawPThDQeazIZLNf9bkA&usqp=CAU"
                }
                link={"Mediator"}
              />
            </GridItem>
            <GridItem>
              <ChoiceCard
                title={"Notarys"}
                desc={
                  "A legal professional dedicated to representing clients in court, providing expert advice, and advocating for their interests to ensure fair legal outcomes."
                }
                image={
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAZpl1RUV7fHakOoKawPThDQeazIZLNf9bkA&usqp=CAU"
                }
                link={"Notary"}
              />
            </GridItem>
            <GridItem>
              <ChoiceCard
                title={"Document Writers"}
                desc={
                  "A legal professional dedicated to representing clients in court, providing expert advice, and advocating for their interests to ensure fair legal outcomes."
                }
                image={
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAZpl1RUV7fHakOoKawPThDQeazIZLNf9bkA&usqp=CAU"
                }
                link={"document writer"}
              />
            </GridItem>
          </Grid>
        </VStack>

        {/* <Footer /> */}
      </div>
    </>
  );
}
