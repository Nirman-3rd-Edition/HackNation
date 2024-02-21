import React from "react";

import { Grid, GridItem, Image } from "@chakra-ui/react";
import AchieversCard from "./Cards/AchieversCard";

const AchieversPage = () => {
  return (
    <>
      <Grid templateColumns={"repeat(3,1fr)"}>
        <GridItem>
          <AchieversCard
            title={"Vivek Ranjan Sahoo"}
            desc={
              "This sofa is perfect for modern tropical spaces, baroque inspired spaces, earthy toned spaces and for people who love a chic design with a sprinkle of vintage design."
            }
            rank={1}
          />
        </GridItem>
        <GridItem>
          <AchieversCard
            title={"Vivek Ranjan Sahoo"}
            desc={
              "This sofa is perfect for modern tropical spaces, baroque inspired spaces, earthy toned spaces and for people who love a chic design with a sprinkle of vintage design."
            }
            rank={2}
          />
        </GridItem>
        <GridItem>
          <AchieversCard
            title={"Vivek Ranjan Sahoo"}
            desc={
              "This sofa is perfect for modern tropical spaces, baroque inspired spaces, earthy toned spaces and for people who love a chic design with a sprinkle of vintage design."
            }
            rank={3}
          />
        </GridItem>
      </Grid>
    </>
  );
};

export default AchieversPage;
